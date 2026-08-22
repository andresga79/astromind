import AgentDemo from "@/components/AgentDemo";
import Starfield from "@/components/Starfield";

/* HERO: la oferta en el H1, el mecanismo demostrado a la derecha */
export default function Hero() {
  return (
    <>
      <Starfield />
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">
              Software a medida, automatización e inteligencia artificial
            </h1>
            <p className="hero-sub">
              Diseñamos y construimos los sistemas que eliminan el trabajo manual
              de tu operación: cotizaciones que se responden solas, datos que
              dejan de copiarse entre planillas, procesos que corren aunque nadie
              los vigile.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contacto">
                Solicitar diagnóstico gratuito
              </a>
              <a className="btn btn-ghost" href="#servicios">
                Ver servicios
              </a>
            </div>
            <p className="hero-note">
              Diagnóstico inicial sin costo · Propuesta a medida según tu
              operación · Acompañamiento durante todo el desarrollo
            </p>
          </div>
          <AgentDemo />
        </div>
      </section>
    </>
  );
}
