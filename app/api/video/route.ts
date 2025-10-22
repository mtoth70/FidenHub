import { NextResponse } from "next/server";
import { buildJitsiRoom } from "@lib/jitsi";
import { z } from "zod";

const BodySchema = z.object({
  bookingId: z.string()
});

export async function POST(req: Request) {
  const { bookingId } = BodySchema.parse(await req.json());
  const data = buildJitsiRoom(bookingId);
  return NextResponse.json({ ok: true, ...data });
}
