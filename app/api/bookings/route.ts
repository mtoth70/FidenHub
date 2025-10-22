import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { z } from "zod";

const BodySchema = z.object({
  buyerEmail: z.string().email(),
  expertId: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  priceTotal: z.number().int().positive(),
  durationMin: z.number().int().positive()
});

export async function POST(req: Request) {
  const json = await req.json();
  const data = BodySchema.parse(json);

  // buyer "auto-signup" simple por email (MVP)
  let buyer = await prisma.user.findUnique({ where: { email: data.buyerEmail }});
  if (!buyer) {
    buyer = await prisma.user.create({
      data: { email: data.buyerEmail, name: data.buyerEmail.split("@")[0], role: "buyer" }
    });
  }

  const booking = await prisma.booking.create({
    data: {
      buyerId: buyer.id,
      expertId: data.expertId,
      start: new Date(data.start),
      end: new Date(data.end),
      durationMin: data.durationMin,
      priceTotal: data.priceTotal,
      status: "pending"
    }
  });

  return NextResponse.json({ ok: true, booking });
}
