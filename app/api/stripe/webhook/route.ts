import { NextResponse } from "next/server";
import { prisma } from "@lib/prisma";
import { stripe } from "@lib/stripe";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }
  const buf = await req.arrayBuffer();
  const text = Buffer.from(buf).toString("utf8");

  let event;
  try {
    event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const bookingId = session?.metadata?.bookingId as string | undefined;
    if (bookingId) {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: "paid" }
      });
    }
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: { bodyParser: false }
};
