"use client";
import { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookingCTA({ expert }: { expert: any }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>
        Ver disponibilidad
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} expert={expert} />
    </>
  );
}
