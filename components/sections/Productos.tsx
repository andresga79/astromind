/* PRODUCTOS */
export default function Productos() {
  return (
    <section className="section" id="productos" aria-labelledby="productos-title">
      <div className="container">
        <h2 id="productos-title">Productos propios</h2>
        <div className="productos-grid">
          <article className="producto producto-lead">
            <div className="producto-head">
              <h3>Turisters</h3>
              <span className="badge badge-live">en producción</span>
            </div>
            <p>
              Plataforma de gestión y venta de experiencias turísticas para
              operadores pequeños y medianos: inventario, reservas y pagos en un
              solo lugar.
            </p>
            <a
              className="producto-link"
              href="https://turisters.cl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visitar turisters.cl
              <span className="link-arrow" aria-hidden="true"> →</span>
            </a>
          </article>
          <article className="producto">
            <div className="producto-head">
              <h3>AstrhorusAI</h3>
              <span className="badge badge-lab">en investigación</span>
            </div>
            <p>
              Nuestro motor de agentes de IA: filtra leads, responde consultas
              repetitivas y agenda reuniones con las reglas de tu negocio. Lo
              viste trabajando en el inicio.
            </p>
            <p className="producto-note">
              Pilotos disponibles — pregúntanos en el diagnóstico.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
