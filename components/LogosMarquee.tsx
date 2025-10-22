"use client";
import { useEffect, useRef } from "react";

const LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/02/Stripe_Logo%2C_revised_2016.svg",
];

export default function LogosMarquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0;
    let raf = 0;
    const step = () => {
      x = (x - 0.5) % el.scrollWidth;
      el.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{overflow:'hidden', border:'1px solid var(--border)', borderRadius:12, background:'#fff'}}>
      <div style={{display:'flex', gap:48, alignItems:'center', padding:'18px 24px', whiteSpace:'nowrap', willChange:'transform'}} ref={ref}>
        {LOGOS.concat(LOGOS).map((src,i)=>(
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" style={{height:28, opacity:.75}} />
        ))}
      </div>
    </div>
  );
}
