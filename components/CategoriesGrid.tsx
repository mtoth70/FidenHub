const CATS = [
  { k:"Growth",    desc:"Ads, funnels, analytics" },
  { k:"Ventas",    desc:"Outbound, playbooks B2B" },
  { k:"Producto",  desc:"Discovery, roadmap" },
  { k:"UX",        desc:"Research, testing" },
  { k:"Ads",       desc:"Meta, Google, LinkedIn" },
  { k:"Analytics", desc:"Instrumentación y métricas" },
];

export default function CategoriesGrid() {
  return (
    <div className="list" style={{gridTemplateColumns:'repeat(3,minmax(0,1fr))'}}>
      {CATS.map(c=>(
        <a key={c.k} className="card" href={`/experts?q=${encodeURIComponent(c.k)}`} style={{padding:16, display:'grid', gap:6}}>
          <div style={{fontWeight:700}}>{c.k}</div>
          <div className="hero-sub" style={{margin:0}}>{c.desc}</div>
        </a>
      ))}
    </div>
  );
}
