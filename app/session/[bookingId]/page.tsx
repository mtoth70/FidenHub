"use client";
import { useEffect, useState } from "react";
import JitsiEmbed from "../../../components/JitsiEmbed";

export default function SessionPage({ params }: { params: { bookingId: string } }) {
  const [data, setData] = useState<{ domain: string; roomName: string } | null>(null);

  useEffect(() => {
    fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: params.bookingId })
    })
      .then(r => r.json())
      .then(d => setData({ domain: d.domain, roomName: d.roomName }));
  }, [params.bookingId]);

  if (!data) return <main className="section"><div className="container">Cargando sala…</div></main>;

  return (
    <main className="section">
      <div className="container">
        <h1 style={{ marginTop: 0 }}>Tu sesión</h1>
        <JitsiEmbed domain={data.domain} roomName={data.roomName} displayName="Cliente" />
      </div>
    </main>
  );
}
