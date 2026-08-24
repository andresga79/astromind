"use client";

import { useEffect, useState } from "react";

const messages = [
  { from: "client" as const, text: "Hola, ¿tienen horas disponibles para mañana?" },
  { from: "astra" as const, text: "¡Hola! Sí, tengo estas opciones: 10:00, 12:00 o 16:00 hrs." },
  { from: "client" as const, text: "Perfecto, reservemos a las 12:00." },
  { from: "astra" as const, text: "Listo, tu hora está agendada. ¿Necesitas algo más?" },
];

export default function AstraChatDemo() {
  const [visible, setVisible] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(messages.length);
      return;
    }
    if (visible >= messages.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 1400);
    return () => clearTimeout(t);
  }, [visible, reducedMotion]);

  return (
    <div aria-label="Demo de conversación con Astra" className="chat-demo">
      <div className="chat-head">
        <span className="chat-dot" />
        <span className="chat-title">Astra</span>
        <span className="chat-status">En línea</span>
      </div>
      <div className="chat-body">
        {messages.slice(0, visible).map((m, i) => (
          <div className={`chat-bubble chat-bubble-${m.from}`} key={i}>
            {m.text}
          </div>
        ))}
      </div>
    </div>
  );
}
