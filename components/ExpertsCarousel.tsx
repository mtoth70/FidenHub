"use client";
import { useRef } from "react";
import ExpertCard from "./ExpertCard";

export default function ExpertsCarousel({ experts }:{ experts:any[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir:number) => {
    scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };
  return (
    <div className="card" style={{padding:12}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <span className="label">Desliza para ver más</span>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={()=>scroll(-1)} aria-label="Anterior">◀</button>
          <button className="btn" onClick={()=>scroll(1)} aria-label="Siguiente">▶</button>
        </div>
      </div>
      <div ref={scroller} style={{display:'grid', gridAutoFlow:'column', gridAutoColumns:'minmax(280px, 1fr)', gap:12, overflowX:'auto', paddingBottom:8}}>
        {experts.map(e => <ExpertCard key={e.id} expert={e} />)}
      </div>
    </div>
  );
}
