import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());


type SensorKind = 'co2' | 'pm25' | 'temperature' | 'humidity' | 'pressure';

interface MetricReading {
  kind: SensorKind; value: number; unit: string; ts: number;
}
interface SensorBox {
  id: string; name: string; location: string; online: boolean; lastPingTs: number;
  metrics: MetricReading[];
}
// Add new sensor boxes here for demo purposes
let boxes: SensorBox[] = [
  {
    id: 'Pi1049',
    name: 'Pi1049',
    location: 'University of Maryland - Roof',
    online: true,
    lastPingTs: Date.now(),
    metrics: [
      { kind: 'co2',         value: 450,  unit: 'ppm',  ts: Date.now() },
      { kind: 'pm25',        value: 8.2,  unit: 'µg/m³', ts: Date.now() },
      { kind: 'temperature', value: 24.5, unit: '°C',   ts: Date.now() },
      { kind: 'humidity',    value: 55.0, unit: '%',    ts: Date.now() },
      { kind: 'pressure',    value: 1012, unit: 'hPa',  ts: Date.now() },
    ],
  },
  {
    id: 'Pi1052',
    name: 'Pi1052',
    location: 'NIST - Building 1',
    online: true,
    lastPingTs: Date.now(),
    metrics: [
      { kind: 'co2',         value: 460,  unit: 'ppm',  ts: Date.now() },
      { kind: 'pm25',        value: 7.3,  unit: 'µg/m³', ts: Date.now() },
      { kind: 'temperature', value: 27.0, unit: '°C',   ts: Date.now() },
      { kind: 'humidity',    value: 45.0, unit: '%',    ts: Date.now() },
      { kind: 'pressure',    value: 1020, unit: 'hPa',  ts: Date.now() },
    ],
  },
  {
    id: 'Pi533',
    name: 'Pi533',
    location: 'University of Maryland - Floor 2',
    online: true,
    lastPingTs: Date.now(),
    metrics: [
      { kind: 'co2',         value: 420,  unit: 'ppm',  ts: Date.now() },
      { kind: 'pm25',        value: 9.2,  unit: 'µg/m³', ts: Date.now() },
      { kind: 'temperature', value: 24.0, unit: '°C',   ts: Date.now() },
      { kind: 'humidity',    value: 57.2, unit: '%',    ts: Date.now() },
      { kind: 'pressure',    value: 1024, unit: 'hPa',  ts: Date.now() },
    ],
  },
  // ...repeat for other boxes
];

// REST: list
app.get('/api/sensors', (_req, res) => {
  res.json(boxes);
});

// REST: details
app.get('/api/sensors/:id', (req, res) => {
  const box = boxes.find(b => b.id === req.params.id);
  if (!box) return res.status(404).json({ error: 'Not found' });
  res.json(box);
});

// REST: mock history (hourly for 24h)
app.get('/api/sensors/:id/history', (req, res) => {
  const box = boxes.find(b => b.id === req.params.id);
  if (!box) return res.status(404).json({ error: 'Not found' });

  const now = Date.now();
  const hours = [...Array(24)].map((_, i) => now - (23 - i) * 3600000);
  const history = box.metrics.map(m => ({
    kind: m.kind,
    unit: m.unit,
    points: hours.map(ts => ({
      ts,
      value: m.value * (0.9 + Math.random() * 0.2), // wiggle for demo
    })),
  }));
  res.json({ id: box.id, history });
});

// SSE stream: pushes live metric changes every 5s for online boxes
app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders?.();

  const timer = setInterval(() => {
    const now = Date.now();
    boxes = boxes.map(b => {
      if (!b.online) return b;
      const mutate = (v: number, jitter = 0.03) => +(v * (1 - jitter + Math.random() * 2 * jitter)).toFixed(1);
      const next = {
        ...b,
        lastPingTs: now,
        metrics: b.metrics.map(m => ({
          ...m,
          value: mutate(m.value, m.kind === 'co2' ? 0.02 : 0.06),
          ts: now,
        })),
      };
      return next;
    });

    const payload = { type: 'sensor:update', at: now, boxes };
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  }, 5000);

  req.on('close', () => clearInterval(timer));
});

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
