import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { SensorBox } from '../../types/sensors';
import { fetchSensor, fetchHistory } from '../../api/sensors';
import ChartDetails from '../../components/ChartDetails/ChartDetails';

export default function SensorDetailsPage() {
  const { id = '' } = useParams();
  const [box, setBox] = useState<SensorBox | null>(null);
  const [history, setHistory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [b, h] = await Promise.all([fetchSensor(id), fetchHistory(id)]);
        setBox(b);
        setHistory(h);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div style={{ padding: 16 }}>Loading…</div>;
  if (!box) return <div style={{ padding: 16 }}>Not found.</div>;

  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h2>{box.name}</h2>
      <p style={{ color: '#6b7280' }}>{box.location}</p>

      {/* Quick latest metrics */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {box.metrics.map((m) => (
          <div key={m.kind} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{m.kind.toUpperCase()}</div>
            <div style={{ fontWeight: 700 }}>{m.value} {m.unit}</div>
          </div>
        ))}
      </div>


      <div style={{ width: '100em', boxSizing:'border-box',}}>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
          <h3 style={{ marginBottom: 8 }}>Trend (last 24h)</h3>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em'}}>

          {history != null && history.history?.length > 0 ? (
            history.history.map((item: any, index: number) => (
              <ChartDetails key={index} data={item} />
            ))
          ) : (
            <div> History not found </div>
          )}
        </div>
      </div>
    </div>
  );
}
