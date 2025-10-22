import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { stripe } from "@lib/stripe";
import { z } from "zod";

const BodySchema = z.object({
  bookingId: z.string()
});

export async function POST(req: Request) {
  const { bookingId } = BodySchema.parse(await req.json());
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { expert: { include: { user: true } }, buyer: true }
  });
  if (!booking) return NextResponse.json({ ok: false, error: "Booking not found" }, { status: 404 });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.NEXTAUTH_URL}/success?bookingId=${booking.id}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/failed?bookingId=${booking.id}`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: booking.priceTotal * 100,
          product_data: {
            name: `Sesión con ${booking.expert.user.name ?? "Experto"}`,
            description: `${booking.durationMin} minutos`
          }
        }
      }
    ],
    metadata: { bookingId: booking.id }
  });

  return NextResponse.json({ ok: true, url: session.url });
}
