import AstraChatDemo from "./AstraChatDemo";

export default function AstraHero() {
  return (
    <section className="astra-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">Agente de IA para pymes</p>
          <h1>Un agente que responde, califica y agenda por ti</h1>
          <p className="hero-sub">
            Astra atiende a tus clientes en WhatsApp, Instagram y correo las 24 horas.
            Nunca pierdas una venta por no alcanzar a responder.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="https://calendly.com/astromind/astra"
              rel="noreferrer"
              target="_blank"
            >
              Agendar una demo
            </a>
            <a className="btn btn-ghost" href="#funciones">
              Ver funciones
            </a>
          </div>
        </div>
        <AstraChatDemo />
      </div>
    </section>
  );
}
