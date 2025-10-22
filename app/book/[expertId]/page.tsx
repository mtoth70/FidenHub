"use client";
import { useState } from "react";
import CalendarPicker from "../../../components/CalendarPicker";
import { useRouter } from "next/navigation";

export default function BookPage({ params }: { params: { expertId: string } }) {
  const router = useRouter();
  const [slot, setSlot] = useState<{ start: string; end: string } | null>(null);
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(30);
  const [price, setPrice] = useState(100); // US$ placeholder

  const createBooking = async () => {
    if (!slot) return;
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        buyerEmail: email,
        expertId: params.expertId,
        start: slot.start,
        end: slot.end,
        durationMin: duration,
        priceTotal: price
      })
    });
    const json = await res.json();
    if (json.ok) {
      router.push(`/checkout/${json.booking.id}`);
    } else {
      alert("No se pudo crear la reserva");
    }
  };

  return (
    <main className="section">
      <div className="container" style={{ display: "grid", gap: 12, maxWidth: 720 }}>
        <h1 style={{ marginTop: 0 }}>Reservar sesión</h1>
        <label className="label">Tu email</label>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" />
        <label className="label">Duración (min)</label>
        <input className="input" type="number" value={duration} onChange={e => setDuration(parseInt(e.target.value || "30"))} />
        <label className="label">Precio total (USD)</label>
        <input className="input" type="number" value={price} onChange={e => setPrice(parseInt(e.target.value || "100"))} />
        <CalendarPicker onSelect={setSlot} />
        <button className="btn btn-primary" onClick={createBooking} disabled={!slot || !email}>
          Continuar a pago
        </button>
      </div>
    </main>
  );
}
