"use client";
import { useEffect, useMemo, useState } from "react";

function mockSlots() {
  // genera 6 slots próximos
  const res: {start: Date; end: Date}[] = [];
  const base = new Date();
  for (let d=0; d<3; d++) {
    for (let h of [10, 15]) {
      const start = new Date(base);
      start.setDate(base.getDate()+d+1);
      start.setHours(h, 0, 0, 0);
      const end = new Date(start); end.setMinutes(start.getMinutes()+30);
      res.push({ start, end });
    }
  }
  return res;
}

export default function BookingModal({ open, onClose, expert }:{ open:boolean; onClose:()=>void; expert:any }) {
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(30);
  const [sel, setSel] = useState<number|null>(null);
  const slots = useMemo(()=>mockSlots(), []);

  useEffect(()=>{ if (!open) { setSel(null); setEmail(""); setDuration(30); } }, [open]);

  if (!open) return null;
  const price = Math.round(((expert.pricePerHour||120) / 60) * duration);

  return (
    <div style={{position:'fixed', inset:0, background:'rgba(15,23,42,.45)', display:'grid', placeItems:'center', padding:'24px', zIndex:60}}>
      <div className="card" style={{width:'min(720px, 100%)', padding:16, display:'grid', gap:12}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <strong>Reservar sesión con {expert.name}</strong>
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>

        <div style={{display:'grid', gap:10}}>
          <label className="label">Tu email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
        </div>

        <div style={{display:'grid', gap:10}}>
          <label className="label">Duración</label>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {[15,30,45,60].map(m => (
              <button key={m} className={`btn ${duration===m?'btn-primary':''}`} onClick={()=>setDuration(m)}>{m} min</button>
            ))}
          </div>
        </div>

        <div style={{display:'grid', gap:10}}>
          <label className="label">Elige un horario</label>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
            {slots.map((s, i)=>(
              <button key={i} className={`btn ${sel===i?'btn-primary':''}`} onClick={()=>setSel(i)}>
                {s.start.toLocaleString()} — {s.end.toLocaleTimeString()}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>Total estimado</div>
          <div style={{fontWeight:800}}>${price} USD</div>
        </div>

        <div style={{display:'flex', gap:10, justifyContent:'flex-end'}}>
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" disabled={!email || sel===null} onClick={()=>{
            alert(`(Front) Simulación de reserva:
Email: ${email}
Duración: ${duration} min
Slot: ${slots[sel!].start.toLocaleString()}

En el siguiente paso conectaremos Stripe y Calendar.`);
            onClose();
          }}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
