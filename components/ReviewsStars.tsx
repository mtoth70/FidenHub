"use client";
export default function ReviewsStars({ rating, count }:{ rating:number; count:number }) {
  const full = Math.round(rating || 0);
  return (
    <div style={{display:'flex', alignItems:'center', gap:6, fontSize:13, color:'var(--muted)'}}>
      <span>{"★★★★★☆☆☆☆☆".slice(5-full,10-full)}</span>
      <span>{rating?.toFixed?.(1) ?? "0.0"} ({count})</span>
    </div>
  );
}
