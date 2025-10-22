"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ExpertCard from "../../components/ExpertCard";
import FilterBar from "../../components/FilterBar";
import { experts as base } from "../../data/experts";

export default function ExpertsList() {
  const sp = useSearchParams();
  const initialQ = sp.get("q") || "";
  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const [sort, setSort] = useState<string>("rating");

  const filtered = useMemo(() => {
    let res = [...base];
    if (q) {
      const qq = q.toLowerCase();
      res = res.filter(
        (e) =>
          e.name.toLowerCase().includes(qq) ||
          e.role.toLowerCase().includes(qq) ||
          e.categories.some((c) => c.toLowerCase().includes(qq))
      );
    }
    if (category) res = res.filter((e) => e.categories.includes(category));
    if (lang) res = res.filter((e) => (e.languages || []).includes(lang));
    if (sort === "rating")
      res = res.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === "price_asc")
      res = res.sort(
        (a, b) => (a.pricePerHour || 0) - (b.pricePerHour || 0)
      );
    if (sort === "price_desc")
      res = res.sort(
        (a, b) => (b.pricePerHour || 0) - (a.pricePerHour || 0)
      );
    return res;
  }, [q, category, lang, sort]);

  return (
    <main>
      <Header />

      <section className="section" aria-label="Explorar expertos">
        <div className="container" style={{ display: "grid", gap: 24 }}>
          <h1 style={{ marginTop: 0 }}>Explora expertos</h1>
          <FilterBar
            q={q}
            onQ={setQ}
            category={category}
            onCategory={setCategory}
            lang={lang}
            onLang={setLang}
            sort={sort}
            onSort={setSort}
          />
          <div
            className="list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.length > 0 ? (
              filtered.map((e) => <ExpertCard key={e.id} expert={e} />)
            ) : (
              <p style={{ color: "var(--muted)" }}>
                No se encontraron expertos que coincidan con tu búsqueda.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
