import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSearch from "../components/HeroSearch";
import ExpertCard from "../components/ExpertCard";
import { experts } from "../data/experts";

// nuevos bloques
import LogosMarquee from "../components/LogosMarquee";
import CategoriesGrid from "../components/CategoriesGrid";
import ExpertsCarousel from "../components/ExpertsCarousel";
import Steps from "../components/Steps";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTASticky from "../components/CTASticky";

export default function Home() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="hero">
  <div
    className="container"
    style={{
      textAlign: "center",
      maxWidth: 720,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "75vh"
    }}
  >
          <div>
            <h1 className="hero-title">
            Aprende directamente de expertos que ya lograron lo que tú buscas
            </h1>
            <p className="hero-sub">
            Conecta por videollamada y recibe asesorías verificadas en Tecnología, Negocios, Startups y más.
       </p>
            <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: 20
  }}
>
  <a href="/experts" className="btn btn-primary" style={{fontSize: "18px", padding: "12px 32px"}}>
    Buscar expertos
  </a>
</div>
            <div style={{marginTop:16, fontSize:13, color:'var(--muted)'}}>
              <span>⭐ 4.9/5 en 250+ sesiones verificados</span>
            </div>
          </div>

      
        </div>
      </section>

      {/* Carrusel */}
      <section className="section" aria-label="Expertos recomendados">
        <div className="container" style={{display:'grid', gap:16}}>
          <h2 style={{margin:'0 0 4px'}}>Expertos recomendados</h2>
          <ExpertsCarousel experts={experts} />
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="section" aria-label="Cómo funciona">
        <div className="container" style={{display:'grid', gap:16}}>
          <h2 style={{margin:'0 0 4px'}}>¿Cómo funciona?</h2>
          <Steps />
        </div>
      </section>

      {/* Testimonios */}
      <section className="section" aria-label="Testimonios">
        <div className="container" style={{display:'grid', gap:16}}>
          <h2 style={{margin:'0 0 4px'}}>Resultados reales</h2>
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-label="Preguntas frecuentes">
        <div className="container" style={{display:'grid', gap:16}}>
          <h2 style={{margin:'0 0 4px'}}>Preguntas frecuentes</h2>
          <FAQ />
        </div>
      </section>

      <Footer />
      {/* CTA pegajoso al final */}
      <CTASticky />
    </main>
  );
}