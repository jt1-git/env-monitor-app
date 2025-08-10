import type { SensorBox } from '../types/sensors';

const BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000';

export async function fetchSensors(): Promise<SensorBox[]> {
  const res = await fetch(`${BASE}/api/sensors`);
  if (!res.ok) throw new Error('Failed to fetch sensors');
  return res.json();
}

export async function fetchSensor(id: string): Promise<SensorBox> {
  const res = await fetch(`${BASE}/api/sensors/${id}`);
  if (!res.ok) throw new Error('Sensor not found');
  return res.json();
}

export async function fetchHistory(id: string): Promise<any> {
  const res = await fetch(`${BASE}/api/sensors/${id}/history`);
  if (!res.ok) throw new Error('History not found');
  return res.json();
}

// Simple SSE connector
export function connectLive(onUpdate: (boxes: SensorBox[]) => void) {
  const url = `${BASE}/api/stream`;
  const es = new EventSource(url);

  es.onmessage = (ev) => {
    try {
      const parsed = JSON.parse(ev.data);
      if (parsed?.type === 'sensor:update') onUpdate(parsed.boxes);
    } catch {}
  };

  return () => es.close();
}
