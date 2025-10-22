export default function CTASticky() {
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:50, background:'rgba(255,255,255,.9)', backdropFilter:'blur(6px)',
      borderTop:'1px solid var(--border)'
    }}>
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, padding:'10px 0'}}>
        <div className="hero-sub" style={{margin:0}}>¿Listo para hablar con un experto?</div>
        <a className="btn btn-primary" href="/experts">Buscar expertos</a>
      </div>
    </div>
  );
}
