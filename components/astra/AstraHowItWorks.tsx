const steps = [
  {
    number: "01",
    title: "Conectas tus canales",
    description:
      "Vinculamos WhatsApp, Instagram, correo o tu sitio web en minutos.",
  },
  {
    number: "02",
    title: "Astra responde 24/7",
    description:
      "Responde preguntas, califica intereses y resuelve consultas recurrentes al instante.",
  },
  {
    number: "03",
    title: "Recibes leads listos",
    description:
      "Llegan a tu CRM o calendario ya agendados, para que tu equipo solo cierre.",
  },
];

export default function AstraHowItWorks() {
  return (
    <section className="astra-section astra-steps" id="funciones">
      <div className="container">
        <p className="section-eyebrow">Cómo funciona</p>
        <h2>Tres pasos para no volver a perder una venta</h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step-card" key={s.number}>
              <span className="step-number">{s.number}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
