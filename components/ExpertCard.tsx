"use client";
import Link from "next/link";
import ReviewsStars from "./ReviewsStars";
import BookingModal from "./BookingModal";
import { useState } from "react";

export default function ExpertCard({ expert }: { expert: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ padding: 14, display:'grid', gap:10 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={expert.avatar} alt={expert.name} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 10 }} />
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
        <div>
          <div style={{fontWeight:700}}>{expert.name}</div>
          <div style={{fontSize:13, color:'var(--muted)'}}>{expert.role}{expert.company ? ` · ${expert.company}` : ""}</div>
        </div>
        <ReviewsStars rating={expert.rating||0} count={expert.reviewsCount||0} />
      </div>
      <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
        {expert.categories.slice(0,3).map((c:string)=>(
          <span key={c} className="badge" style={{background:'#eef2ff', color:'#3730a3'}}>{c}</span>
        ))}
      </div>
      <div style={{display:'flex', gap:8}}>
        <Link href={`/experts/${expert.id}`} className="btn" style={{flex:1}}>Ver perfil</Link>
        <button className="btn btn-primary" onClick={()=>setOpen(true)}>Reservar</button>
      </div>
      <BookingModal open={open} onClose={()=>setOpen(false)} expert={expert}/>
    </div>
  );
}
