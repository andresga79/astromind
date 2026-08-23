import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { getDb } from "./client";
import { leads } from "./schema";

vi.hoisted(() => {
  process.env.DATABASE_URL ??= "postgresql://postgres:postgres@localhost:55432/astromind_test";
});

describe("getDb", () => {
  beforeAll(async () => {
    const db = await getDb();
    await db.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL,
        empresa TEXT,
        mensaje TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
  });

  afterAll(async () => {
    const db = await getDb();
    await db.execute(`DELETE FROM leads WHERE email = 'ana@empresa.cl';`);
  });

  it("inserta y lee un lead", async () => {
    const db = await getDb();
    const [inserted] = await db.insert(leads).values({
      nombre: "Ana",
      email: "ana@empresa.cl",
      mensaje: "Quiero automatizar cotizaciones",
    }).returning();
    expect(inserted.id).toBeGreaterThan(0);
    expect(inserted.empresa).toBeNull();
    const rows = await db.select().from(leads);
    expect(rows.length).toBeGreaterThan(0);
  });
});
