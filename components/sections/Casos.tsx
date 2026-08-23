/* CASOS: el caso de estudio de Bitácora — producto real, en producción */
// TODO(dueño): completar las tres métricas marcadas como pendientes (o borrar
// las filas) antes de publicar. Son cifras reales de Bitácora: no inventarlas.
export default function Casos() {
  return (
    <section className="section" id="casos" aria-labelledby="casos-title">
      <div className="container casos-grid">
        <div className="section-lead">
          <h2 id="casos-title">El caso: Bitácora</h2>
          <p>
            Nuestro producto propio para operadores de experiencias turísticas —
            y la mejor demostración de cómo trabajamos: de proceso manual a
            plataforma en producción.
          </p>
          <a
            className="producto-link"
            href="https://turisters.cl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar turisters.cl (se abre en una pestaña nueva)"
          >
            Ver Bitácora en producción
            <span className="link-arrow" aria-hidden="true"> →</span>
          </a>
        </div>
        <div className="caso-body">
          <article className="caso-bloque">
            <h3>El problema</h3>
            <p>
              Un operador turístico típico vive pegado a WhatsApp: las consultas
              llegan de a una, los cupos se anotan en planillas, los pagos se
              confirman por transferencia con captura de pantalla. Cada venta
              exige copiar datos a mano entre tres herramientas — y cada copia
              es una oportunidad de error.
            </p>
          </article>
          <article className="caso-bloque">
            <h3>Lo que construimos</h3>
            <p>
              Bitácora centraliza toda la operación: inventario de experiencias
              con cupos reales, reservas en línea, pagos integrados y
              confirmaciones automáticas. El operador ve su negocio completo en
              una sola pantalla; el turista reserva y paga como en cualquier
              tienda moderna, sin escribir un solo mensaje.
            </p>
          </article>
          <article className="caso-bloque">
            <h3>El resultado</h3>
            <p>
              Reservas que antes tomaban una hora de ida y vuelta por chat hoy
              se completan solas. El operador deja de administrar herramientas
              y se dedica a la experiencia.
            </p>
            <dl className="casos-ledger">
              {/* TODO(dueño): reemplazar cada "—" con la cifra real de Bitácora */}
              <div className="caso-row">
                <dt>Operadores activos</dt>
                <dd>
                  <span className="caso-num caso-pendiente">—</span>
                  <span className="caso-label">por confirmar</span>
                </dd>
              </div>
              <div className="caso-row">
                <dt>Reservas gestionadas</dt>
                <dd>
                  <span className="caso-num caso-pendiente">—</span>
                  <span className="caso-label">por confirmar</span>
                </dd>
              </div>
              <div className="caso-row">
                <dt>Tiempo por reserva</dt>
                <dd>
                  <span className="caso-num caso-pendiente">—</span>
                  <span className="caso-label">antes vs. hoy</span>
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
