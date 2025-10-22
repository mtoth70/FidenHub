"use client";
import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const isLogged = !!session?.user;

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="FidenHub Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="FidenHub" width={28} height={28} />
          <strong>Fiden</strong>&nbsp;<span style={{ color: "#0EA5E9" }}>Hub</span>
        </Link>

        <nav className="nav" aria-label="primary" style={{ display:"flex", gap:12, alignItems:"center" }}>
          <Link href="/experts">Buscar expertos</Link>

          {status === "loading" ? null : isLogged ? (
            <>
              <Link href="/me" className="btn btn-sm">Mi perfil</Link>
              <Link href="/me" className="brand" aria-label="Mi perfil" style={{ marginLeft: 4 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
  src={"/avatar-placeholder.svg"}
  alt="avatar"
  width={28}
  height={28}
  style={{ borderRadius: "50%", border: "1px solid var(--border)" }}
/>
              </Link>
            </>
          ) : (
            <>
              <Link href="/register" className="btn btn-sm">Crear cuenta</Link>
              <Link href="/login" className="btn btn-sm">Entrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

