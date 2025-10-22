const T = [
  { n:"María — Fundadora", q:"“Conseguí claridad en pricing en 30 minutos. Valió cada dólar.”" },
  { n:"Jorge — Head of Sales", q:"“Implementamos un playbook outbound en una semana gracias a la sesión.”" },
  { n:"Lucía — PM", q:"“Validamos nuestro onboarding con un experto en UX. Ahorramos meses.”" },
];

export default function Testimonials() {
  return (
    <div className="list" style={{gridTemplateColumns:'repeat(3,minmax(0,1fr))'}}>
      {T.map((t,i)=>(
        <div key={i} className="card" style={{padding:16, display:'grid', gap:8}}>
          <div style={{fontSize:32, lineHeight:0.8, color:'#0ea5e9'}}>“</div>
          <div style={{fontWeight:600}}>{t.q}</div>
          <div className="hero-sub" style={{margin:0}}>{t.n}</div>
        </div>
      ))}
    </div>
  );
}
