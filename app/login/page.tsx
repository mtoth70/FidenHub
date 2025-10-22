"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const { status } = useSession();
  const sp = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState(sp.get("email") || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const callbackUrl = sp.get("callbackUrl") || "/";
  const providerError = sp.get("error"); // errores que NextAuth añade en la URL

  // Si ya está autenticado, evita ver el login
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/me");
    }
  }, [status, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email: email.trim().toLowerCase(),
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (!res || res.error) {
      setMsg("Email o contraseña inválidos");
      return;
    }

    // Si NextAuth retorna una URL, úsala; sino, usa callbackUrl
    router.push(res.url ?? callbackUrl);
  }

  // Mapea mensajes de error comunes de NextAuth
  const nextAuthError =
    providerError === "CredentialsSignin"
      ? "Email o contraseña inválidos"
      : providerError === "AccessDenied"
      ? "Acceso denegado"
      : providerError
      ? "Ocurrió un error al iniciar sesión"
      : null;

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ maxWidth: 520 }}>
          <h1 style={{ marginTop: 0 }}>Entrar</h1>
          <p className="hero-sub">Accede a tu cuenta para reservar sesiones y gestionar tu perfil.</p>

          {(msg || nextAuthError) && (
            <div
              className="card"
              style={{ padding: 12, background: "#fee2e2", borderColor: "#fecaca", marginBottom: 12 }}
              role="alert"
            >
              {msg || nextAuthError}
            </div>
          )}

          <form onSubmit={onSubmit} className="card" style={{ padding: 16, display: "grid", gap: 12 }}>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="input"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Contraseña</label>
              <input
                id="password"
                name="password"
                className="input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <a className="btn" href="/">Cancelar</a>
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Ingresando..." : "Entrar"}
              </button>
            </div>
          </form>

          <p className="label" style={{ marginTop: 12 }}>
            ¿No tienes cuenta?{" "}
            <a href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} style={{ textDecoration: "underline" }}>
              Crear cuenta
            </a>
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

