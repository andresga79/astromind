import { afterAll, describe, expect, it } from "vitest";
import { rmSync } from "node:fs";
import { getDb } from "./client";
import { leads } from "./schema";

const TEST_DB = "/tmp/opencode/astromind-test.db";

describe("getDb", () => {
  afterAll(() => {
    try { rmSync(TEST_DB); } catch {}
  });

  it("inserta y lee un lead", () => {
    process.env.DB_PATH = TEST_DB;
    const db = getDb();
    const inserted = db.insert(leads).values({
      nombre: "Ana",
      email: "ana@empresa.cl",
      mensaje: "Quiero automatizar cotizaciones",
    }).returning().get();
    expect(inserted.id).toBeGreaterThan(0);
    expect(inserted.empresa).toBeNull();
    const rows = db.select().from(leads).all();
    expect(rows).toHaveLength(1);
  });
});
