"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  return (
    <form onSubmit={(e)=>{e.preventDefault(); router.push(`/experts?q=${encodeURIComponent(q)}`);}} style={{display:'grid', gap:10}}>
      <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Ej: growth, UX, ventas B2B" />
      <button className="btn btn-primary" type="submit">Explorar</button>
    </form>
  );
}
