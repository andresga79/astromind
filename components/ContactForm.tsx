"use client";

import { useRef, useState } from "react";

/* Formulario: validación inline + estados (portado de app.js) */

type FieldName = "nombre" | "email" | "mensaje";
const FIELD_NAMES: FieldName[] = ["nombre", "email", "mensaje"];

const RULES: Record<FieldName, (v: string) => boolean> = {
  nombre: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  mensaje: (v) => v.trim().length >= 10,
};

type Invalid = Record<FieldName, boolean>;
const NO_INVALID: Invalid = { nombre: false, email: false, mensaje: false };

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const empresaRef = useRef<HTMLInputElement>(null);
  const webRef = useRef<HTMLInputElement>(null);
  const mensajeRef = useRef<HTMLTextAreaElement>(null);
  const [invalid, setInvalid] = useState<Invalid>(NO_INVALID);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ text: string; cls: string }>({
    text: "",
    cls: "",
  });

  function fieldRef(name: FieldName) {
    if (name === "nombre") return nombreRef.current;
    if (name === "email") return emailRef.current;
    return mensajeRef.current;
  }

  function validate(name: FieldName, value: string): boolean {
    const ok = RULES[name](value);
    setInvalid((prev) => (prev[name] === !ok ? prev : { ...prev, [name]: !ok }));
    return ok;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    let firstBad: FieldName | null = null;
    const next: Invalid = { ...NO_INVALID };
    for (const name of FIELD_NAMES) {
      const input = fieldRef(name);
      if (!input) continue;
      if (!RULES[name](input.value)) {
        next[name] = true;
        if (!firstBad) firstBad = name;
      }
    }
    setInvalid(next);
    if (firstBad) {
      fieldRef(firstBad)?.focus();
      setStatus({
        text: "Revisa los campos marcados antes de enviar.",
        cls: "is-error",
      });
      return;
    }

    setSending(true);
    setStatus({ text: "Enviando…", cls: "" });

    const payload = {
      nombre: (nombreRef.current?.value ?? "").trim(),
      email: (emailRef.current?.value ?? "").trim(),
      empresa: (empresaRef.current?.value ?? "").trim(),
      mensaje: (mensajeRef.current?.value ?? "").trim(),
      web: webRef.current?.value ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("http " + res.status);
      await res.json();
      form.reset();
      setInvalid(NO_INVALID);
      setStatus({
        text: "¡Gracias por escribirnos! Te respondemos dentro de las próximas 24 horas hábiles.",
        cls: "is-ok",
      });
    } catch {
      setStatus({
        text: "No pudimos enviar tu mensaje (problema de conexión). Tu texto sigue escrito: inténtalo de nuevo en unos minutos o escríbenos a contacto@astromind.cl.",
        cls: "is-error",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" id="contact-form" noValidate onSubmit={handleSubmit} ref={formRef}>
      <div className="field">
        <label htmlFor="f-nombre">Nombre</label>
        <input
          id="f-nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          ref={nombreRef}
          aria-invalid={invalid.nombre ? "true" : undefined}
          onBlur={(e) => validate("nombre", e.target.value)}
          onChange={(e) => {
            if (invalid.nombre) validate("nombre", e.target.value);
          }}
        />
        <p className="field-error" id="e-nombre" role="alert" hidden={!invalid.nombre}>
          Ingresa tu nombre.
        </p>
      </div>
      <div className="field">
        <label htmlFor="f-email">Correo</label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          ref={emailRef}
          aria-invalid={invalid.email ? "true" : undefined}
          onBlur={(e) => validate("email", e.target.value)}
          onChange={(e) => {
            if (invalid.email) validate("email", e.target.value);
          }}
        />
        <p className="field-error" id="e-email" role="alert" hidden={!invalid.email}>
          Ingresa un correo válido.
        </p>
      </div>
      <div className="field">
        <label htmlFor="f-empresa">
          Empresa <span className="opcional">(opcional)</span>
        </label>
        <input
          id="f-empresa"
          name="empresa"
          type="text"
          autoComplete="organization"
          ref={empresaRef}
        />
      </div>
      <div className="field">
        <label htmlFor="f-mensaje">¿Qué proceso quieres mejorar?</label>
        <textarea
          id="f-mensaje"
          name="mensaje"
          rows={4}
          required
          minLength={10}
          ref={mensajeRef}
          aria-invalid={invalid.mensaje ? "true" : undefined}
          onBlur={(e) => validate("mensaje", e.target.value)}
          onChange={(e) => {
            if (invalid.mensaje) validate("mensaje", e.target.value);
          }}
        />
        <p className="field-error" id="e-mensaje" role="alert" hidden={!invalid.mensaje}>
          Cuéntanos un poco más (mínimo 10 caracteres).
        </p>
      </div>
      {/* Honeypot: oculto con .honey, fuera del orden de tabulación */}
      <input
        className="honey"
        type="text"
        name="web"
        id="f-web"
        tabIndex={-1}
        autoComplete="off"
        ref={webRef}
      />
      <button className="btn btn-primary btn-submit" type="submit" disabled={sending}>
        Enviar mensaje
      </button>
      <p
        className={"form-status" + (status.cls ? " " + status.cls : "")}
        id="form-status"
        role="status"
        aria-live="polite"
      >
        {status.text}
      </p>
    </form>
  );
}
