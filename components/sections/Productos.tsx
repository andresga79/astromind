/* PRODUCTOS */
export default function Productos() {
  return (
    <section className="section" id="productos" aria-labelledby="productos-title">
      <div className="container">
        <h2 id="productos-title">Productos propios</h2>
        <div className="productos-grid tres">
          <article className="producto producto-lead">
            <div className="producto-head">
              <h3>Astra</h3>
              <span className="badge badge-live">disponible</span>
            </div>
            <p>
              Nuestro motor de agentes de IA: filtra leads, responde consultas
              repetitivas y agenda reuniones con las reglas de tu negocio. Lo
              viste trabajando en el inicio.
            </p>
            <p className="producto-note">
              Ya en producción — agenda una demo y verás cómo atendería a tus
              clientes. Conócelo en detalle.
            </p>
            <a className="producto-link" href="/astra">
              Conoce Astra →
            </a>
          </article>

          <article className="producto">
            <div className="producto-head">
              <h3>Turisters</h3>
              <span className="badge badge-live">en producción</span>
            </div>
            <p>
              Plataforma de turismo para Chile: destinos, eventos y rutas con
              mapas interactivos, reseñas y publicaciones de operadores con
              pago en línea.
            </p>
            <a
              className="producto-link"
              href="https://turisters.cl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Turisters (se abre en una pestaña nueva)"
            >
              Visitar Turisters →
            </a>
          </article>

          <article className="producto">
            <div className="producto-head">
              <h3>Astrovet</h3>
              <span className="badge badge-live">disponible</span>
            </div>
            <p>
              Software veterinario para clínicas y atención a domicilio:
              gestión de pacientes, visitas y agenda en una sola plataforma.
            </p>
            <a
              className="producto-link"
              href="https://salvet-app-production.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver a Salvet, cliente de Astrovet (se abre en una pestaña nueva)"
            >
              Ver caso real (Salvet) →
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
