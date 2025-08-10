// all the different sensor readings
export type SensorKind =
  | 'co2'
  | 'pm25'
  | 'temperature'
  | 'humidity'
  | 'pressure';

// A metric reading, generic across kinds
export interface MetricReading {
  kind: SensorKind;
  value: number;
  unit: string;   // "ppm", "µg/m³", "°C", "%", etc.
  ts: number;     // unix ms
}

// One physical box
export interface SensorBox {
  id: string;           // e.g. "Pi1052"
  name: string;         // display name
  location: string;     // "Building A - Floor 2"
  online: boolean;
  metrics: MetricReading[]; // latest readings (one per kind)
  lastPingTs: number;
}

// Useful description for rendering/thresholds
export interface MetricDescriptor {
  label: string;
  unit: string;
  // thresholds for "good/warn/bad" coloring, optional per metric
  thresholds?: { warn: number; bad: number };
}

// Central registry: add new kinds here to scale
export const METRICS_REGISTRY: Record<SensorKind, MetricDescriptor> = {
  co2:         { label: 'CO₂',    unit: 'ppm',    thresholds: { warn: 800, bad: 1200 } },
  pm25:        { label: 'PM2.5',  unit: 'µg/m³',  thresholds: { warn: 12,  bad: 35   } },
  temperature: { label: 'Temp',   unit: '°C' },
  humidity:    { label: 'Humidity', unit: '%' },
  pressure:    { label: 'Pressure', unit: 'hPa' },  
};