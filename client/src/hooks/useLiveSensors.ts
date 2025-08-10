import { useEffect, useMemo, useState } from 'react';
import type { SensorBox } from '../types/sensors';
import { fetchSensors, connectLive } from '../api/sensors';

export function useLiveSensors() {
  const [boxes, setBoxes] = useState<SensorBox[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let unsub = () => {};
    (async () => {
      try {
        const init = await fetchSensors();
        setBoxes(init);
        unsub = connectLive(setBoxes);
      } finally {
        setLoading(false);
      }
    })();
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return boxes;
    const q = search.toLowerCase();
    return boxes.filter(
      b =>
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q)
    );
  }, [boxes, search]);

  const overview = useMemo(() => {
    const total = boxes.length;
    const online = boxes.filter(b => b.online).length;
    const offline = total - online;
    // simple distinct location count
    const locations = new Set(boxes.map(b => b.location)).size;
    return { total, online, offline, locations };
  }, [boxes]);

  return { boxes, filtered, overview, loading, search, setSearch };
}