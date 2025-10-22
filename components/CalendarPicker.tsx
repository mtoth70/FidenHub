"use client";
import { useEffect, useState } from "react";

type Slot = { start: string; end: string };
export default function CalendarPicker({
  onSelect
}: { onSelect: (slot: Slot) => void }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar").then(r => r.json()).then(d => {
      setSlots(d.slots ?? []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="card" style={{padding:12}}>Cargando horarios…</div>;
  if (!slots.length) return <div className="card" style={{padding:12}}>No hay horarios disponibles.</div>;

  return (
    <div className="card" style={{ padding: 12, display: "grid", gap: 10 }}>
      <strong>Selecciona un horario</strong>
      {slots.map((s, i) => (
        <button key={i} className="btn btn-ghost" onClick={() => onSelect(s)}>
          {new Date(s.start).toLocaleString()} — {new Date(s.end).toLocaleTimeString()}
        </button>
      ))}
    </div>
  );
}
