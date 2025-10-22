import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  return (
    <main className="section">
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <h1 style={{ marginTop: 0 }}>Dashboard</h1>
        <p>Hola, {session.user?.name || session.user?.email} 👋</p>
        <div className="card" style={{ padding: 16 }}>
          <strong>Próximas reservas</strong>
          <p>(Aquí listaremos tus bookings cuando conectemos todo)</p>
        </div>
      </div>
    </main>
  );
}
