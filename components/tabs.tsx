"use client";
import { useState, useEffect, ReactNode } from "react";

type Tab = { id: string; label: string };
export default function Tabs({
  tabs,
  initial,
  children,
}: {
  tabs: Tab[];
  initial?: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState(initial || tabs[0]?.id);
  useEffect(()=>{ if (!active && tabs[0]) setActive(tabs[0].id); }, [tabs, active]);

  return (
    <div>
      <div style={{display:"flex", gap:8, flexWrap:"wrap", marginBottom:12}}>
        {tabs.map(t=>(
          <button
            key={t.id}
            className={`btn btn-sm ${active===t.id ? "btn-primary": ""}`}
            onClick={()=>setActive(t.id)}
            style={{borderRadius:999}}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* panels */}
      <div style={{display:"grid", gap:12}}>
        {Array.isArray(children)
          ? children.map((child:any) =>
              child?.props?.["data-tab"] === active ? child : null
            )
          : children}
      </div>
    </div>
  );
}
