/* SERVICIOS: registro editorial, no grilla de tarjetas */
export default function Servicios() {
  return (
    <section className="section" id="servicios" aria-labelledby="servicios-title">
      <div className="container servicios-grid">
        <div className="section-lead">
          <h2 id="servicios-title">Lo que construimos</h2>
          <p>
            Cada proyecto parte de tu proceso real — no de una plantilla. Primero
            diagnosticamos dónde se te escapa el tiempo, después construimos sobre
            eso.
          </p>
        </div>
        <div className="servicios-list">
          <article className="servicio">
            <h3>Software a medida</h3>
            <p>
              Sistemas web y APIs hechos para tu proceso exacto, no para el
              proceso promedio del mercado. Tu operación deja de doblarse para
              caber en una herramienta genérica.
            </p>
            <p className="servicio-meta">
              Angular · Node · PostgreSQL · despliegue en la nube
            </p>
          </article>
          <article className="servicio">
            <h3>Automatización de procesos</h3>
            <p>
              Conectamos las herramientas que ya usas para que los datos fluyan
              sin copiar y pegar: WhatsApp, calendarios, planillas, facturación.
            </p>
            <p className="servicio-meta">
              Integraciones · flujos sin código innecesario · reglas tuyas
            </p>
          </article>
          <article className="servicio">
            <h3>Inteligencia artificial aplicada</h3>
            <p>
              Agentes que filtran, clasifican, responden y agendan siguiendo reglas
              que tú defines. IA aplicada a tareas concretas, no a
              demostraciones.
            </p>
            <p className="servicio-meta">
              Nuestro motor: AstrhorusAI · en investigación
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
