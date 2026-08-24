"use client";

import { useEffect, useRef, useState } from "react";

/* Navegación móvil: toggle con aria dinámico, cierre en link y Escape */
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Astromind Tecnología — inicio">
          <svg
            className="brand-mark"
            viewBox="0 0 32 32"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M16 2 L19 13 L30 16 L19 19 L16 30 L13 19 L2 16 L13 13 Z"
              fill="var(--brand)"
            />
          </svg>
          <span className="brand-name">Astromind</span>
        </a>
        <button
          id="nav-toggle"
          className="nav-toggle"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="nav-toggle-bar" aria-hidden="true" />
        </button>
        <nav
          id="site-nav"
          className={"site-nav" + (open ? " is-open" : "")}
          aria-label="Navegación principal"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setOpen(false);
          }}
        >
          <ul>
            <li>
              <a href="#funciones">Funciones</a>
            </li>
            <li>
              <a href="#productos">Productos</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
