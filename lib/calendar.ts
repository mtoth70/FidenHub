// Stub de slots + posible integración futura con Google Calendar
export type Slot = { start: string; end: string };

// Slots de ejemplo próximos 3 días, 10:00 y 15:00 (hora local servidor)
export function getMockSlots(): Slot[] {
  const res: Slot[] = [];
  const base = new Date();
  for (let d = 0; d < 3; d++) {
    const day = new Date(base);
    day.setDate(base.getDate() + d + 1);
    for (const hour of [10, 15]) {
      const start = new Date(day);
      start.setHours(hour, 0, 0, 0);
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + 30);
      res.push({ start: start.toISOString(), end: end.toISOString() });
    }
  }
  return res;
}
