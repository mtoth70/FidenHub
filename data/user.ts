// FILE: data/user.ts
export type Booking = {
  id: string;
  expertName: string;
  date: string;      // ISO string o texto legible
  durationMin: number;
  priceTotal: number;
  status: "pending" | "confirmed" | "completed" | "canceled";
};

export type PaymentMethod = {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "debito" | string;
  last4: string;
  expMonth?: number;
  expYear?: number;
  default?: boolean;
};

// Próximas reservas (mock)
export const upcomingBookings: Booking[] = [
  {
    id: "b1",
    expertName: "Ana (Growth)",
    date: new Date(Date.now() + 86400000).toISOString(), // mañana
    durationMin: 30,
    priceTotal: 45000,
    status: "confirmed",
  },
  {
    id: "b2",
    expertName: "Juan (Producto)",
    date: new Date(Date.now() + 3 * 86400000).toISOString(), // +3 días
    durationMin: 45,
    priceTotal: 60000,
    status: "pending",
  },
];

// Historial (mock)
export const pastBookings: Booking[] = [
  {
    id: "p1",
    expertName: "Laura (UX)",
    date: new Date(Date.now() - 7 * 86400000).toISOString(), // -7 días
    durationMin: 60,
    priceTotal: 90000,
    status: "completed",
  },
];

// Métodos de pago (mock)
export const paymentMethods: PaymentMethod[] = [
  { id: "pm_1", brand: "visa", last4: "4242", expMonth: 12, expYear: 2028, default: true },
  { id: "pm_2", brand: "mastercard", last4: "4444", expMonth: 8, expYear: 2027 },
];
