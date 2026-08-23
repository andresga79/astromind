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
            <p className="hero-eyebrow">
              Software a medida · Automatización · Inteligencia artificial
            </p>
            <h1 id="hero-title">
              Tecnología accesible para que tu pyme no se quede fuera de esta
              nueva era
            </h1>
            <p className="hero-sub">
              Construimos los sistemas que eliminan el trabajo manual de tu
              operación: cotizaciones que se responden solas, datos que dejan
              de copiarse entre planillas, procesos que corren aunque nadie
              los vigile. A un costo pensado para pyme, no para corporación.
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
