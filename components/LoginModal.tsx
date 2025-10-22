"use client";
import { useState } from "react";

export default function LoginModal({ open, onClose }:{ open:boolean; onClose:()=>void }) {
  const [email, setEmail] = useState("");
  if (!open) return null;

  return (
    <div style={{position:'fixed', inset:0, background:'rgba(15,23,42,.45)', display:'grid', placeItems:'center', padding:'24px', zIndex:60}}>
      <div className="card" style={{width:'min(480px, 100%)', padding:16, display:'grid', gap:12}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <strong>Entrar</strong>
          <button className="btn" onClick={onClose}>Cerrar</button>
        </div>
        <input className="input" placeholder="tu@email"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn btn-primary" disabled={!email} onClick={()=>{
          alert(`(Front) Simulación login con ${email}.
En el siguiente bloque activamos NextAuth.`);
          onClose();
        }}>Continuar</button>
        <button className="btn" onClick={()=>{
          alert("(Front) Simulación Login con Google. Activaremos OAuth en el siguiente bloque.");
          onClose();
        }}>Continuar con Google</button>
      </div>
    </div>
  );
}
