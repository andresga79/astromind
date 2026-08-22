import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { rmSync } from "node:fs";
import { POST } from "./route";
import { __resetRateLimiter } from "@/lib/rate-limit";

vi.hoisted(() => {
  process.env.DB_PATH = "/tmp/opencode/astromind-api-test.db";
  process.env.RATE_LIMIT_MAX = "2";
  process.env.RATE_LIMIT_WINDOW_MS = "60000";
});

const valid = { nombre: "Ana", email: "ana@empresa.cl", mensaje: "Quiero automatizar cotizaciones" };

function req(body: unknown, ip = "1.1.1.1") {
  return new Request("http://x/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

afterEach(() => __resetRateLimiter());

afterAll(() => {
  try { rmSync("/tmp/opencode/astromind-api-test.db"); } catch {}
});

describe("POST /api/contact", () => {
  it("200 con payload válido", async () => {
    const res = await POST(req(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("400 con payload inválido", async () => {
    const res = await POST(req({ nombre: "A" }));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Datos incompletos o inválidos." });
  });

  it("400 con body no-JSON", async () => {
    const res = await POST(new Request("http://x", { method: "POST", body: "no-json" }));
    expect(res.status).toBe(400);
  });

  it("honeypot lleno responde ok sin insertar", async () => {
    const res = await POST(req({ ...valid, web: "spam" }));
    expect(res.status).toBe(200);
  });

  it("429 al superar el rate limit", async () => {
    await POST(req(valid, "2.2.2.2"));
    await POST(req(valid, "2.2.2.2"));
    const res = await POST(req(valid, "2.2.2.2"));
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({ error: "Demasiados envíos. Inténtalo de nuevo en unos minutos." });
  });
});
