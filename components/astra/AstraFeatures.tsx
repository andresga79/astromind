const features = [
  {
    title: "Respuesta instantánea",
    description: "Contesta en segundos, sin importar la hora o el día.",
  },
  {
    title: "Calificación de leads",
    description: "Detecta quién está listo para comprar y quién solo pregunta.",
  },
  {
    title: "Agendamiento automático",
    description: "Coordina citas directamente en tu calendario.",
  },
  {
    title: "Seguimiento",
    description: "Reactiva conversaciones que se quedaron sin respuesta.",
  },
  {
    title: "Multicanal",
    description: "WhatsApp, Instagram, correo y web en un solo agente.",
  },
  {
    title: "Reportes",
    description: "Mide conversaciones, leads y conversiones en un panel.",
  },
];

export default function AstraFeatures() {
  return (
    <section className="astra-section astra-features">
      <div className="container">
        <p className="section-eyebrow">Funciones</p>
        <h2>Lo que Astra hace por tu negocio</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
