"use client";

import { useMemo, useState } from "react";
import { REGIONES } from "../../data/chile";
import { validateRut } from "../../lib/rut";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    rut: "",
    region: "",
    comuna: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [showPass, setShowPass] = useState(false);

  const comunas = useMemo(() => {
    const r = REGIONES.find((r) => r.name === form.region);
    return r ? r.communes : [];
  }, [form.region]);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    // Validaciones
    if (
      !form.firstName ||
      !form.lastName ||
      !form.rut ||
      !form.region ||
      !form.comuna ||
      !form.email ||
      !form.password
    ) {
      setMsg({ type: "err", text: "Completa todos los campos." });
      return;
    }
    if (!validateRut(form.rut)) {
      setMsg({ type: "err", text: "RUT inválido." });
      return;
    }
    if (form.password.length < 8) {
      setMsg({ type: "err", text: "La contraseña debe tener al menos 8 caracteres." });
      return;
    }

    try {
      setLoading(true);
      const emailLower = form.email.trim().toLowerCase();

      // 1️⃣ Crear usuario
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, email: emailLower }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al registrar");

      // 2️⃣ Login automático
      const signInRes = await signIn("credentials", {
        email: emailLower,
        password: form.password,
        redirect: false,
      });

      if (!signInRes || signInRes.error) {
        setMsg({ type: "ok", text: "Cuenta creada. Ahora inicia sesión." });
        router.push(`/login?email=${encodeURIComponent(emailLower)}`);
        return;
      }

      // 3️⃣ Redirigir al home con sesión iniciada
      router.push("/");
    } catch (err: any) {
      setMsg({ type: "err", text: err.message || "Error inesperado" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Header />

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <h1 style={{ marginTop: 0 }}>Crear cuenta</h1>
          <p className="hero-sub">Regístrate para reservar sesiones y gestionar tu perfil.</p>

          <form className="card" style={{ padding: 16, display: "grid", gap: 12 }} onSubmit={onSubmit}>
            {/* Nombres / Apellidos */}
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label className="label">Nombres</label>
                <input className="input" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
              </div>
              <div>
                <label className="label">Apellidos</label>
                <input className="input" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
              </div>
            </div>

            {/* RUT */}
            <div>
              <label className="label">RUT (con dígito verificador)</label>
              <input className="input" placeholder="12.345.678-5" value={form.rut} onChange={(e) => set("rut", e.target.value)} />
              {!!form.rut && !validateRut(form.rut) && <small style={{ color: "#b91c1c" }}>RUT no válido</small>}
            </div>

            {/* Región / Comuna */}
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label className="label">Región</label>
                <select
                  className="select"
                  value={form.region}
                  onChange={(e) => {
                    set("region", e.target.value);
                    set("comuna", "");
                  }}
                >
                  <option value="">Selecciona región</option>
                  {REGIONES.map((r) => (
                    <option key={r.name} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Comuna</label>
                <select
                  className="select"
                  value={form.comuna}
                  onChange={(e) => set("comuna", e.target.value)}
                  disabled={!form.region}
                >
                  <option value="">{form.region ? "Selecciona comuna" : "Primero elige región"}</option>
                  {comunas.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Email / Password */}
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </div>
              <div>
                <label className="label">Contraseña</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="input"
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => set("password", e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setShowPass((s) => !s)}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {showPass ? "Ocultar" : "Ver"}
                  </button>
                </div>
                <small className="label">Mínimo 8 caracteres.</small>
              </div>
            </div>

            {/* Mensajes */}
            {msg && (
              <div
                className="card"
                style={{
                  padding: 12,
                  background: msg.type === "ok" ? "#ecfeff" : "#fee2e2",
                  borderColor: msg.type === "ok" ? "#67e8f9" : "#fecaca",
                }}
              >
                {msg.text}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <a className="btn" href="/">
                Cancelar
              </a>
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Creando..." : "Crear cuenta"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
