"use client";
import { useState } from "react";

export default function CheckoutPage({ params }: { params: { bookingId: string } }) {
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: params.bookingId })
    });
    const json = await res.json();
    setLoading(false);
    if (json.ok && json.url) {
      window.location.href = json.url;
    } else {
      alert("No se pudo iniciar pago");
    }
  };

  return (
    <main className="section">
      <div className="container card" style={{ padding: 16 }}>
        <h1 style={{ marginTop: 0 }}>Checkout</h1>
        <p>Reserva: {params.bookingId}</p>
        <button className="btn btn-primary" onClick={pay} disabled={loading}>
          {loading ? "Redirigiendo…" : "Pagar con Stripe"}
        </button>
      </div>
    </main>
  );
}
