"use client";
import { useState } from "react";
const Q = [
  { q:"¿Cómo se seleccionan los expertos?", a:"Revisamos experiencia y referencias. Cada perfil muestra su historial y calificaciones." },
  { q:"¿Qué pasa si la sesión no me sirve?", a:"Ofrecemos garantía: si la sesión no aporta valor, te devolvemos el dinero (caso a caso)." },
  { q:"¿Puedo reprogramar?", a:"Sí, hasta 12 horas antes del inicio de la sesión desde tu panel o correo de confirmación." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="card" style={{padding:12}}>
      {Q.map((item, i)=>(
        <div key={i} style={{borderTop: i? '1px solid var(--border)':'none', padding:'10px 0'}}>
          <button className="btn" style={{width:'100%', justifyContent:'space-between', background:'#fff'}} onClick={()=>setOpen(open===i?null:i)}>
            <span style={{fontWeight:700}}>{item.q}</span>
            <span>{open===i? '–' : '+'}</span>
          </button>
          {open===i && <div className="hero-sub" style={{padding:'8px 12px'}}>{item.a}</div>}
        </div>
      ))}
    </div>
  );
}
