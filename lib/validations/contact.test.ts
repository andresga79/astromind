import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact";

describe("contactSchema", () => {
  it("acepta un payload válido", () => {
    const r = contactSchema.safeParse({
      nombre: "Ana",
      email: "ana@empresa.cl",
      mensaje: "Quiero automatizar cotizaciones",
    });
    expect(r.success).toBe(true);
  });

  it("rechaza nombre corto", () => {
    const r = contactSchema.safeParse({ nombre: "A", email: "a@b.cl", mensaje: "mensaje suficiente" });
    expect(r.success).toBe(false);
  });

  it("rechaza email inválido", () => {
    const r = contactSchema.safeParse({ nombre: "Ana", email: "no-email", mensaje: "mensaje suficiente" });
    expect(r.success).toBe(false);
  });

  it("rechaza mensaje corto", () => {
    const r = contactSchema.safeParse({ nombre: "Ana", email: "a@b.cl", mensaje: "corto" });
    expect(r.success).toBe(false);
  });

  it("empresa opcional y vacío se normaliza a undefined", () => {
    const r = contactSchema.parse({ nombre: "Ana", email: "a@b.cl", mensaje: "mensaje suficiente", empresa: "  " });
    expect(r.empresa).toBeUndefined();
  });

  it("acepta honeypot web como string opcional", () => {
    const r = contactSchema.safeParse({ nombre: "Ana", email: "a@b.cl", mensaje: "mensaje suficiente", web: "spam" });
    expect(r.success).toBe(true);
  });
});
