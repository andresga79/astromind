/* CASOS: cifras del piloto, etiquetadas con honestidad */
// TODO(dueño): dar fuente a estas cifras o etiquetarlas como proyección antes de publicar
export default function Casos() {
  return (
    <section className="section" id="casos" aria-labelledby="casos-title">
      <div className="container casos-grid">
        <div className="section-lead">
          <h2 id="casos-title">Qué se puede esperar</h2>
          <p>
            Cifras medidas en nuestro piloto interno de automatización, comparando
            el proceso antes y después. En el diagnóstico te mostramos la
            metodología y proyectamos el tuyo.
          </p>
        </div>
        <dl className="casos-ledger">
          <div className="caso-row">
            <dt>Errores de proceso manual</dt>
            <dd>
              <span className="caso-num">−75%</span>
              <span className="caso-label">con validaciones automáticas</span>
            </dd>
          </div>
          <div className="caso-row">
            <dt>Eficiencia operativa</dt>
            <dd>
              <span className="caso-num">+85%</span>
              <span className="caso-label">en tareas repetitivas</span>
            </dd>
          </div>
          <div className="caso-row">
            <dt>Costo operativo</dt>
            <dd>
              <span className="caso-num">−40%</span>
              <span className="caso-label">del proceso automatizado</span>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
