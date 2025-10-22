export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
        <span>© {new Date().getFullYear()} IntroClone</span>
        <div style={{ display:"flex", gap:12 }}>
          <a href="#" aria-disabled>Privacidad</a>
          <a href="#" aria-disabled>Términos</a>
          <a href="#" aria-disabled>Política de cancelación</a>
        </div>
      </div>
    </footer>
  );
}