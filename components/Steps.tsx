// FILE: components/Steps.tsx
export default function Steps() {
  const stroke = "#0F172A"; // Slate-900
  const sw = 2.25;          // grosor de línea

  return (
    <div
      className="list"
      style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 20 }}
    >
      {/* 1) Find an expert */}
      <div className="card" style={{ padding: 28, textAlign: "center", background: "#F7F8FA", borderRadius: 20 }}>
        <div style={{ display: "grid", placeItems: "center", marginBottom: 18 }}>
          {/* Lupa + usuario */}
          <svg role="img" aria-hidden viewBox="0 0 64 64" width="72" height="72">
            {/* círculo principal (lupa) */}
            <circle cx="28" cy="28" r="16" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* mango */}
            <path d="M39.5 39.5 L50 50" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
            {/* cabeza usuario */}
            <circle cx="28" cy="25" r="5" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* hombros */}
            <path d="M18.5 37c2.8-5 7-7.5 9.5-7.5S34.7 32 37.5 37" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
          </svg>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Encuentra un experto</h3>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 16, lineHeight: 1.6 }}>
          Descubre y elige entre especialistas verificados según tu necesidad.
        </p>
      </div>

      {/* 2) Book a video call */}
      <div className="card" style={{ padding: 28, textAlign: "center", background: "#F7F8FA", borderRadius: 20 }}>
        <div style={{ display: "grid", placeItems: "center", marginBottom: 18 }}>
          {/* Calendario minimal */}
          <svg role="img" aria-hidden viewBox="0 0 64 64" width="72" height="72">
            {/* marco */}
            <rect x="10" y="14" width="44" height="36" rx="8" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* línea superior */}
            <path d="M10 22h44" stroke={stroke} strokeWidth={sw} />
            {/* ganchos */}
            <path d="M22 10v8M42 10v8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
            {/* casillas */}
            <rect x="20" y="28" width="8" height="8" rx="2" fill="none" stroke={stroke} strokeWidth={sw} />
            <rect x="32" y="28" width="8" height="8" rx="2" fill="none" stroke={stroke} strokeWidth={sw} />
            <rect x="32" y="40" width="8" height="8" rx="2" fill="none" stroke={stroke} strokeWidth={sw} />
          </svg>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Reserva una videollamada</h3>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 16, lineHeight: 1.6 }}>
          Elige un horario que funcione para ambos y confirma tu reserva en 1 minuto.
        </p>
      </div>

      {/* 3) Virtual consultation */}
      <div className="card" style={{ padding: 28, textAlign: "center", background: "#F7F8FA", borderRadius: 20 }}>
        <div style={{ display: "grid", placeItems: "center", marginBottom: 18 }}>
          {/* Cámara / video */}
          <svg role="img" aria-hidden viewBox="0 0 64 64" width="72" height="72">
            {/* cuerpo cámara */}
            <rect x="10" y="22" width="34" height="20" rx="6" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* lente */}
            <circle cx="26.5" cy="32" r="5.5" fill="none" stroke={stroke} strokeWidth={sw} />
            {/* pico cámara */}
            <path d="M44 25l10-6v26l-10-6z" fill="none" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800 }}>Consulta 1&nbsp;a&nbsp;1</h3>
        <p style={{ margin: 0, color: "var(--muted)", fontSize: 16, lineHeight: 1.6 }}>
          Únete a la videollamada, resuelve dudas y llévate acciones concretas.
        </p>
      </div>
    </div>
  );
}
