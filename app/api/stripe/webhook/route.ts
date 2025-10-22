// app/api/stripe/webhook/route.ts
import { headers } from 'next/headers'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'   // evita cache
export const runtime = 'nodejs'          // Stripe requiere Node runtime

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: Request) {
  const body = await req.text() // RAW body para verificar firma
  const sig = headers().get('stripe-signature')
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !endpointSecret) {
    return new Response('Missing Stripe signature or webhook secret', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // TODO: maneja tus eventos aquí
  switch (event.type) {
    case 'checkout.session.completed':
      // tu lógica
      break
  }

  return new Response('OK', { status: 200 })
}
