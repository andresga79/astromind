import AstraChatDemo from "@/components/astra/AstraChatDemo";
import Starfield from "@/components/Starfield";
import { astraCalendlyUrl } from "@/data/astra-config";

/* HERO: Astra como producto, mecanismo demostrado a la derecha */
export default function Hero() {
  return (
    <>
      <Starfield />
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              Agente de IA para pymes · WhatsApp, Instagram y correo
            </p>
            <h1 id="hero-title">
              Astra responde, clasifica y agenda por ti — las 24 horas
            </h1>
            <p className="hero-sub">
              Tu cliente escribe a cualquier hora y Astra le responde al
              instante, filtra quién compra, aclara dudas repetitivas y agenda
              reuniones siguiendo las reglas de tu negocio. Sin perder una
              venta por no alcanzar a contestar.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={astraCalendlyUrl} rel="noreferrer" target="_blank">
                Agendar una demo
              </a>
              <a className="btn btn-ghost" href="#funciones">
                Ver qué hace
              </a>
            </div>
            <p className="hero-note">
              Atiende en tus canales · Se configura con las reglas de tu negocio ·
              Ya en producción
            </p>
          </div>
          <AstraChatDemo />
        </div>
      </section>
    </>
  );
}
