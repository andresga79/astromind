"use client";

import { useEffect, useRef, useState } from "react";

/* Maqueta del agente: tareas resolviéndose en bucle.
   n = -1: reposo (sin clases) · 0..4: tarea n is-active · 5: todas is-done. */
const TASKS = [
  "Lead nuevo por WhatsApp: «Quiero cotizar para el viernes»",
  "Filtrando lead · puntaje 86%",
  "Regla: solo agendar con puntaje mayor a 70%",
  "Reunión agendada en Google Calendar · viernes 10:30",
  "Resumen del día enviado · 0 tareas pendientes",
];

const START_MS = 800;
const STEP_MS = 1400;
const HOLD_DONE = 2200;
const RETRY_MS = 600;

export default function AgentDemo() {
  const [reduced, setReduced] = useState(false);
  const [n, setN] = useState(-1);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
    }
  }, []);

  useEffect(() => {
    if (reduced) return;
    if (n === -1) started.current = true;
    const delay =
      n === 5 ? HOLD_DONE : n === -1 ? (started.current ? RETRY_MS : START_MS) : STEP_MS;
    const timer = setTimeout(() => setN(n === 5 ? -1 : n + 1), delay);
    return () => clearTimeout(timer);
  }, [n, reduced]);

  const done = reduced || n === 5;

  return (
    <div
      className="hero-demo"
      role="img"
      aria-label="Demostración: el agente AstrhorusAI filtra un lead de WhatsApp, evalúa su puntaje y agenda la reunión en el calendario automáticamente"
    >
      <div className="demo-panel">
        <div className="demo-head">
          <span className="demo-dot" aria-hidden="true" />
          <span className="demo-title">AstrhorusAI · agente en acción</span>
          <span className="demo-status" id="demo-status">
            {done ? "completado" : "procesando"}
          </span>
        </div>
        <ul className="demo-list" id="demo-list">
          {TASKS.map((text, i) => {
            const isActive = !reduced && n === i;
            const isDone = done || i < n;
            const cls = [
              "demo-task",
              i === TASKS.length - 1 ? "demo-task-ok" : "",
              isActive ? "is-active" : "",
              isDone ? "is-done" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <li key={i} className={cls} data-task>
                <span className="task-icon" aria-hidden="true" />
                <span className="task-text">{text}</span>
              </li>
            );
          })}
        </ul>
        <div className="demo-foot" aria-hidden="true">
          AstrhorusAI está en investigación · pilotos disponibles
        </div>
      </div>
    </div>
  );
}
