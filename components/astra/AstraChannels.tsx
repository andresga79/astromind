function IconWhatsApp() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.88 12.14L4 20l3.96-1.04A7.93 7.93 0 0 0 20 12a7.85 7.85 0 0 0-2.4-5.68ZM12 17.5c-3.03 0-5.5-2.47-5.5-5.5 0-3.03 2.47-5.5 5.5-5.5 3.03 0 5.5 2.47 5.5 5.5 0 3.03-2.47 5.5-5.5 5.5Zm2.9-3.9c-.15-.08-.9-.44-1.04-.49-.14-.05-.24-.08-.34.08-.1.16-.4.49-.49.6-.09.1-.18.12-.33.04-.15-.08-.63-.23-1.2-.74-.44-.4-.74-.88-.83-1.03-.09-.15-.01-.23.07-.3.07-.07.15-.18.23-.27.08-.09.1-.15.15-.25.05-.1.02-.2-.01-.27-.04-.08-.34-.82-.46-1.12-.12-.29-.24-.25-.34-.26-.09 0-.18-.02-.28-.02-.1 0-.25.04-.38.18-.13.15-.5.49-.5 1.19 0 .7.51 1.37.58 1.47.08.1 1 1.52 2.43 2.13.34.15.6.23.81.3.34.11.65.09.89.06.27-.04.9-.37 1.03-.72.12-.36.12-.66.08-.72-.03-.07-.12-.1-.27-.17Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}

function IconWeb() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z" />
    </svg>
  );
}

const channels = [
  { icon: IconWhatsApp, label: "WhatsApp" },
  { icon: IconInstagram, label: "Instagram" },
  { icon: IconEmail, label: "Correo" },
  { icon: IconWeb, label: "Web" },
];

export default function AstraChannels() {
  return (
    <section className="astra-section astra-channels" id="canales">
      <div className="container">
        <p className="section-eyebrow">Canales</p>
        <h2>Atiende donde ya hablan tus clientes</h2>
        <div className="channels-grid">
          {channels.map((c) => (
            <div className="channel-card" key={c.label}>
              <c.icon />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
