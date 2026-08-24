export default function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <h2 id="faq-title">Preguntas frecuentes</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>¿Qué valor me entrega una solución tecnológica?</summary>
            <div className="faq-body">
              <p>
                Tu operación deja de depender de planillas y mensajes sueltos: los
                datos viven en un sistema, los procesos repetitivos corren solos y
                tú ves el estado completo de tu negocio en una sola pantalla. El
                valor concreto se mide en horas recuperadas y errores que dejan de
                ocurrir.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>¿Cuánto demora un proyecto?</summary>
            <div className="faq-body">
              <p>
                Depende del alcance: un piloto de automatización es cuestión de
                semanas; un sistema a medida completo, de meses. En el diagnóstico
                inicial te damos un plazo concreto para tu caso antes de que
                comprometas nada.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>¿Qué pasa después de la entrega?</summary>
            <div className="faq-body">
              <p>
                No entregamos y desaparecemos: acompañamos todo el desarrollo y
                quedamos disponibles para soporte y mejoras. El sistema es tuyo y
                evoluciona con tu operación.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>¿Trabajan con cualquier rubro?</summary>
            <div className="faq-body">
              <p>
                Sí, mientras exista un proceso con pasos repetitivos y datos que se
                muevan entre personas. Turismo, servicios, retail y operaciones
                internas son nuestro terreno habitual.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
