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
              Ya en producción — agenda una demo y verás cómo atendería a tus
              clientes. Conócelo en detalle.
            </p>
            <a className="producto-link" href="/astra">
              Conoce Astra →
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
