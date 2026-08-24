/* PRODUCTOS */
export default function Productos() {
  return (
    <section className="section" id="productos" aria-labelledby="productos-title">
      <div className="container">
        <h2 id="productos-title">Productos propios</h2>
        <div className="productos-grid solo">
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
              Ya en producción — pregúntanos en el diagnóstico. Nuestro primer
              producto, Bitácora, también está en producción: lo conoces en
              el caso de estudio.
            </p>
            <a
              className="producto-link"
              href="https://astra.astromind.cl"
              rel="noreferrer"
              target="_blank"
            >
              Conoce Astra →
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
