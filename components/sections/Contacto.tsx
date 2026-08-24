import { astraCalendlyUrl } from "@/data/astra-config";

/* CONTACTO: agenda una demo de Astra */
export default function Contacto() {
  return (
    <section className="section" id="contacto" aria-labelledby="contacto-title">
      <div className="container contacto-grid">
        <div className="section-lead">
          <h2 id="contacto-title">Agenda tu demo de Astra</h2>
          <p>
            Mira cómo Astra atendería a tus clientes. Te mostramos la
            conversación en tus canales, la calificación de leads y el
            agendamiento con tus reglas, con datos de tu negocio.
          </p>
          <ul className="contacto-bullets">
            <li>Demo guiada de 20 minutos</li>
            <li>Adaptada a tu operación y tus reglas</li>
            <li>Sin costo, sin compromiso</li>
          </ul>
        </div>
        <div className="contacto-actions">
          <a
            className="btn btn-primary btn-lg"
            href={astraCalendlyUrl}
            rel="noreferrer"
            target="_blank"
          >
            Agendar mi demo
          </a>
          <p className="contacto-note">
            Elige el horario que mejor te acomode — Astra se encarga del resto.
          </p>
        </div>
      </div>
    </section>
  );
}
