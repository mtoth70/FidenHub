import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const rows = await prisma.expert.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });

  const experts = rows.map((e) => ({
    id: e.id,
    name: e.user.name ?? "Experto",
    role: e.headline ?? "Expert",
    company: "",
    categories: (e.categoriesCsv || "").split(",").filter(Boolean),
    rating: e.ratingAvg ?? 0,
    avatar: "https://i.pravatar.cc/300?img=47"
  }));

  return NextResponse.json({ ok: true, experts });
}
