import { IconContext } from 'react-icons';
import { FaCircle, FaLocationDot } from 'react-icons/fa6';
import { METRICS_REGISTRY, type SensorBox } from '../../types/sensors';
import './SensorCard.css'; // create a tiny CSS for spacing

interface Props {
  box: SensorBox;
  onClick?: (id: string) => void;
}

function metricClass(kind: keyof typeof METRICS_REGISTRY, value: number) {
  const t = METRICS_REGISTRY[kind].thresholds;
  if (!t) return '';
  if (value >= t.bad) return 'metric-bad';
  if (value >= t.warn) return 'metric-warn';
  return 'metric-ok';
}

export default function SensorCard({ box, onClick }: Props) {
  return (
    <div className="card" role="button" onClick={() => onClick?.(box.id)}>
      <div className="card__top">
        <span className="card__title">{box.name}</span>
        <IconContext.Provider value={{ className: 'card__status', color: box.online ? 'green' : 'red' }}>
          <FaCircle />
        </IconContext.Provider>
      </div>

      <div className="card__loc">
        <IconContext.Provider value={{ className: 'card__locIcon', color: 'gray' }}>
          <FaLocationDot />
        </IconContext.Provider>
        <span className="card__locText">{box.location}</span>
      </div>

      <div className="card__metrics">
        {box.metrics.map((m) => {
          const desc = METRICS_REGISTRY[m.kind];
          return (
            <div key={m.kind} className={`metric ${metricClass(m.kind, m.value)}`}>
              <span className="metric__label">{desc.label}</span>
              <span className="metric__value">
                {m.value}
                <span className="metric__unit"> {desc.unit}</span>
              </span>
            </div>
          );
        })}
      </div>

      <span className="card__ping">
        {(((Date.now() - box.lastPingTs) / 1000) / 3600).toFixed(1)}h ago
      </span>
    </div>
  );
}
