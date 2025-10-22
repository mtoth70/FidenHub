"use client";
import { useEffect, useRef } from "react";

export default function JitsiEmbed({
  domain,
  roomName,
  displayName
}: { domain: string; roomName: string; displayName?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const url = `https://${domain}/${roomName}#userInfo.displayName="${encodeURIComponent(displayName ?? "Invitado")}"`;
    if (ref.current) {
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.allow = "camera; microphone; fullscreen; display-capture; autoplay";
      iframe.style.width = "100%";
      iframe.style.height = "80vh";
      iframe.style.border = "0";
      ref.current.innerHTML = "";
      ref.current.appendChild(iframe);
    }
  }, [domain, roomName, displayName]);

  return <div ref={ref} className="card" style={{ padding: 0 }} />;
}
