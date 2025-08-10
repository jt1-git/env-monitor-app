import { useNavigate } from 'react-router-dom';
import { useLiveSensors } from '../../hooks/useLiveSensors';
import SensorCard from '../../components/SensorCard/SensorCard';
import './LiveDataPage.css';

export default function LiveDataPage() {
  const nav = useNavigate();
  const { filtered, overview, loading, search, setSearch } = useLiveSensors();

  return (
    <div className="livePage">
      <header className="livePage__header">
        <h1>Environmental Monitoring Dashboard</h1>
        <p>Monitor air quality and environmental conditions across all sensor locations</p>
      </header>

      <section className="livePage__overview">
        <Stat label="Total Sensors" value={overview.total} />
        <Stat label="Online" value={overview.online} color="green" />
        <Stat label="Offline" value={overview.offline} color="red" />
        <Stat label="Locations" value={overview.locations} />
      </section>

      <div className="livePage__search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sensor boxes by name or location"
        />
      </div>

      {loading ? (
        <div className="livePage__loading">Loading…</div>
      ) : (
        <div className="livePage__grid">
          {filtered.map(b => (
            <SensorCard key={b.id} box={b} onClick={(id) => nav(`/charts/${id}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color?: 'green'|'red' }) {
  return (
    <div className="stat">
      <span className="stat__label">{label}</span>
      <span className="stat__value" style={{ color }}>{value}</span>
    </div>
  );
}
