/* FUNCIONES: lo que hace Astra por tu negocio */
export default function Servicios() {
  return (
    <section className="section" id="funciones" aria-labelledby="funciones-title">
      <div className="container servicios-grid">
        <div className="section-lead">
          <h2 id="funciones-title">Lo que Astra hace por ti</h2>
          <p>
            Astra no es un bot genérico: se entrena con las reglas y la
            información de tu negocio para atender como lo harías tú, solo que
            sin descanso. Empieza a trabajar desde el primer día.
          </p>
        </div>
        <div className="servicios-list">
          <article className="servicio">
            <h3>Atiende en tus canales</h3>
            <p>
              Responde al instante en WhatsApp, Instagram y correo, las 24
              horas. Aclara dudas repetitivas, comparte disponibilidad y recibe
              consultas que antes se perdían fuera de horario.
            </p>
            <p className="servicio-meta">
              WhatsApp · Instagram · correo · múltiples conversaciones a la vez
            </p>
          </article>
          <article className="servicio">
            <h3>Clasifica tus leads</h3>
            <p>
              Astra entiende quién está listo para comprar, filtra según tus
              criterios y prioriza las conversaciones. Tú te quedas con lo que
              cierra, no con el ruido.
            </p>
            <p className="servicio-meta">
              Calificación automática · reglas que tú defines · reportes claros
            </p>
          </article>
          <article className="servicio">
            <h3>Agenda reuniones</h3>
            <p>
              Toma horas, confirma y recuerda citas siguiendo las reglas de tu
              negocio y tu calendario. El agendamiento ocurre en la
              conversación, sin copiar datos de un lado a otro.
            </p>
            <p className="servicio-meta">
              Integrado a tu agenda · confirmaciones automáticas · tu marca
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
