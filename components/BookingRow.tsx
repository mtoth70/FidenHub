"use client";

export default function BookingRow({ booking }: { booking: any }) {
  return (
    <div className="card" style={{padding:12, display:"grid", gap:8, gridTemplateColumns:"1fr auto", alignItems:"center"}}>
      <div>
        <div style={{fontWeight:700}}>{booking.expertName}</div>
        <div className="label">
          {booking.dateStr} · {booking.duration} min · {booking.status}
        </div>
      </div>
      <div style={{display:"flex", gap:8}}>
        <a className="btn btn-sm" href={`/experts/${booking.expertSlug}`}>Ver perfil</a>
        {booking.status === "confirmada" && <button className="btn btn-sm btn-primary">Unirme a la llamada</button>}
        {booking.status !== "finalizada" && <button className="btn btn-sm">Reprogramar</button>}
        {booking.status !== "finalizada" && <button className="btn btn-sm">Cancelar</button>}
      </div>
    </div>
  );
}
