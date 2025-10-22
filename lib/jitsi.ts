export function buildJitsiRoom(bookingId: string) {
  const domain = process.env.JITSI_DOMAIN || "meet.jit.si";
  const roomName = `introclone_${bookingId}`;
  const url = `https://${domain}/${roomName}`;
  return { domain, roomName, url };
}
