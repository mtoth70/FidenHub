"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <span style={{ opacity: 0.6 }}>Cargando…</span>;
  if (!session) {
    return <button className="btn btn-ghost" onClick={() => signIn()}>Entrar</button>;
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>
        {session.user?.name || session.user?.email}
      </span>
      <button className="btn btn-ghost" onClick={() => signOut()}>Salir</button>
    </div>
  );
}
