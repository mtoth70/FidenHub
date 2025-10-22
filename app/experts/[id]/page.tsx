import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ReviewsStars from "../../../components/ReviewsStars";
import { experts } from "../../../data/experts";
import BookingCTA from "../../../components/BookingCTA";

export default function ExpertProfile({ params }: { params: { id: string } }) {
  const expert = experts.find(e => e.id === params.id);
  if (!expert) return notFound();

  return (
    <main>
      <Header />
      <section className="section">
        <div className="container" style={{ display:'grid', gap:16, gridTemplateColumns:'320px 1fr', alignItems:'start' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={expert.avatar} alt={expert.name} style={{ width: 320, borderRadius: 12 }} />
          <div style={{display:'grid', gap:12}}>
            <div>
              <h1 style={{margin:'0 0 6px'}}>{expert.name}</h1>
              <div style={{color:'var(--muted)'}}>{expert.role}{expert.company ? ` · ${expert.company}` : ""}</div>
              <div style={{marginTop:8}}><ReviewsStars rating={expert.rating||0} count={expert.reviewsCount||0} /></div>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
              {expert.categories.map(c => <span key={c} className="badge" style={{background:'#eef2ff', color:'#3730a3'}}>{c}</span>)}
            </div>
            <p style={{marginTop:0}}>{expert.bio}</p>

            <div className="card" style={{ padding: 16, display:'grid', gap:10 }}>
              <div style={{display:'flex', gap:10, alignItems:'baseline', justifyContent:'space-between'}}>
                <strong>Reserva con {expert.name.split(" ")[0]}</strong>
                <div style={{color:'var(--muted)'}}>Desde ${expert.pricePerHour}/h</div>
              </div>
              {/* Componente cliente para interactividad */}
              <BookingCTA expert={expert} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
