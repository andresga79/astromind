function IconBolt() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M13 2 4.09 12.11a.6.6 0 0 0 .47.99H11l-2 8 8.91-10.11a.6.6 0 0 0-.47-.99H13l2-8Z" />
    </svg>
  );
}

function IconFunnelCheck() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M4 4h16l-6 7.5V19l-4 2v-9.5L4 4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconCalendarCheck() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <rect height="16" rx="2" width="18" x="3" y="4" />
      <path d="M16 2v4M8 2v4M3 10h18M9 14l2 2 4-4" />
    </svg>
  );
}

function IconLoop() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64" />
      <path d="M21 3v9h-9M3 21v-9h9" />
    </svg>
  );
}

function IconChannels() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22l5.9-2Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  );
}

const features = [
  {
    title: "Respuesta instantánea",
    description: "Contesta en segundos, sin importar la hora o el día.",
    icon: IconBolt,
  },
  {
    title: "Calificación de leads",
    description: "Detecta quién está listo para comprar y quién solo pregunta.",
    icon: IconFunnelCheck,
  },
  {
    title: "Agendamiento automático",
    description: "Coordina citas directamente en tu calendario.",
    icon: IconCalendarCheck,
  },
  {
    title: "Seguimiento",
    description: "Reactiva conversaciones que se quedaron sin respuesta.",
    icon: IconLoop,
  },
  {
    title: "Multicanal",
    description: "WhatsApp, Instagram, correo y web en un solo agente.",
    icon: IconChannels,
  },
  {
    title: "Reportes",
    description: "Mide conversaciones, leads y conversiones en un panel.",
    icon: IconChart,
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
              <div className="feature-icon">
                <f.icon />
              </div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
