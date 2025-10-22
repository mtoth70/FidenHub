"use client";
const CATS = ["Growth","Ventas","Producto","UX","Ads","Analytics"];
const LANGS = ["es","en","pt","fr"];

export default function FilterBar({
  q, onQ, category, onCategory, lang, onLang, sort, onSort
}: {
  q: string; onQ: (v:string)=>void;
  category: string|null; onCategory: (v:string|null)=>void;
  lang: string|null; onLang: (v:string|null)=>void;
  sort: string; onSort: (v:string)=>void;
}) {
  return (
    <div className="card" style={{padding:12, display:'grid', gap:10}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:10}}>
        <input className="input" placeholder="Buscar..." value={q} onChange={e=>onQ(e.target.value)} />
        <select className="select" value={category||""} onChange={e=>onCategory(e.target.value||null)}>
          <option value="">Categoría</option>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="select" value={lang||""} onChange={e=>onLang(e.target.value||null)}>
          <option value="">Idioma</option>
          {LANGS.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select className="select" value={sort} onChange={e=>onSort(e.target.value)}>
          <option value="rating">Mejor rating</option>
          <option value="price_asc">Precio ↑</option>
          <option value="price_desc">Precio ↓</option>
        </select>
      </div>
    </div>
  );
}
