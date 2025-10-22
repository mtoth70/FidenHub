// FILE: app/me/page.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

// Mocks de reservas y pagos (temporal hasta conectar DB real en esta vista)
import {
  upcomingBookings,
  pastBookings,
  paymentMethods,
} from "../../data/user";

export default function MePage() {
  const { data: session, status } = useSession();

  const fullName =
    (session?.user as any)?.firstName && (session?.user as any)?.lastName
      ? `${(session?.user as any).firstName} ${(session?.user as any).lastName}`
      : session?.user?.name || session?.user?.email || "Tu cuenta";

  return (
    <main>
      <Header />

      <section className="section">
        <div className="container" style={{ display: "grid", gap: 16 }}>
          <div
            className="card"
            style={{
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar-placeholder.svg"
                alt="avatar"
                width={48}
                height={48}
                style={{
                  borderRadius: "50%",
                  border: "1px solid var(--border)",
                }}
              />
              <div>
                <h1 style={{ margin: 0, fontSize: 20 }}>{fullName}</h1>
                <div className="label">
                  {session?.user?.email || "Sesión iniciada"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Link href="/experts" className="btn">
                Buscar expertos
              </Link>
              <button
  className="btn btn-primary"
  onClick={() => signOut({ callbackUrl: "/login" })}
>
  Cerrar sesión
</button>

            </div>
          </div>

          {/* Próximas reservas */}
          <section className="card" style={{ padding: 16 }}>
            <h2 style={{ marginTop: 0 }}>Próximas reservas</h2>
            {upcomingBookings.length === 0 ? (
              <p className="label" style={{ margin: 0 }}>
                Aún no tienes reservas próximas.
              </p>
            ) : (
              <div className="list" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {upcomingBookings.map((b) => (
                  <article
                    key={b.id}
                    className="card"
                    style={{ padding: 12, display: "grid", gap: 6 }}
                  >
                    <strong>{b.expertName}</strong>
                    <span className="label">
                      {new Date(b.date).toLocaleString()}
                    </span>
                    <span className="label">
                      {b.durationMin} min · ${b.priceTotal.toLocaleString()}
                    </span>
                    <span
                      className="badge"
                      style={{ width: "fit-content", marginTop: 4 }}
                    >
                      {b.status}
                    </span>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <button className="btn btn-sm">Reprogramar</button>
                      <button className="btn btn-sm">Cancelar</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Historial */}
          <section className="card" style={{ padding: 16 }}>
            <h2 style={{ marginTop: 0 }}>Historial</h2>
            {pastBookings.length === 0 ? (
              <p className="label" style={{ margin: 0 }}>
                Aún no tienes sesiones completadas.
              </p>
            ) : (
              <div className="list" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {pastBookings.map((b) => (
                  <article
                    key={b.id}
                    className="card"
                    style={{ padding: 12, display: "grid", gap: 6 }}
                  >
                    <strong>{b.expertName}</strong>
                    <span className="label">
                      {new Date(b.date).toLocaleString()}
                    </span>
                    <span className="label">
                      {b.durationMin} min · ${b.priceTotal.toLocaleString()}
                    </span>
                    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                      <button className="btn btn-sm">Repetir sesión</button>
                      <button className="btn btn-sm">Dejar reseña</button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Pagos */}
          <section className="card" style={{ padding: 16 }}>
            <h2 style={{ marginTop: 0 }}>Métodos de pago</h2>
            {paymentMethods.length === 0 ? (
              <p className="label" style={{ margin: 0 }}>
                No tienes tarjetas guardadas.
              </p>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className="card"
                    style={{
                      padding: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong style={{ textTransform: "capitalize" }}>
                        {pm.brand}
                      </strong>{" "}
                      •••• {pm.last4}
                      {pm.expMonth && pm.expYear && (
                        <span className="label"> — exp {pm.expMonth}/{pm.expYear}</span>
                      )}
                      {pm.default && (
                        <span className="badge" style={{ marginLeft: 8 }}>
                          Predeterminada
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {!pm.default && (
                        <button className="btn btn-sm">Hacer predeterminada</button>
                      )}
                      <button className="btn btn-sm">Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}

