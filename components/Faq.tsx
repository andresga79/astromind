export default function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <h2 id="faq-title">Preguntas frecuentes</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>¿Cómo responde Astra en mis canales?</summary>
            <div className="faq-body">
              <p>
                Conectas tu WhatsApp, Instagram y correo, y Astra atiende al
                instante con la información de tu negocio. Responde consultas
                repetitivas, comparte disponibilidad y solo deriva a tu equipo
                los casos que requieren humanos.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>¿Cómo sé que responde bien a mis clientes?</summary>
            <div className="faq-body">
              <p>
                Astra se entrena con tu información y reglas, y puedes revisar
                cada conversación. Además califica y prioriza leads por ti, así
                que ves quién está listo para comprar sin leer todo el chat.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>¿Cuánto tarda en ponerse en marcha?</summary>
            <div className="faq-body">
              <p>
                En una demo de 20 minutos lo ves funcionando con tu operación.
                La puesta en producción depende del alcance: desde una semana
                si solo atiende consultas y agenda, un poco más si necesitas
                integraciones a medida.
              </p>
            </div>
          </details>
          <details className="faq-item">
            <summary>¿Funciona para mi negocio?</summary>
            <div className="faq-body">
              <p>
                Si recibes consultas y quieres responder más rápido, sí. Lo
                usan pymes de servicios, turismo y retail. La demo la adaptamos
                a tu rubro y tus reglas de agendamiento.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
