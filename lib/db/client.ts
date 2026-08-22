import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import * as schema from "./schema";

let singleton: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (singleton) return singleton;
  const url = process.env.DB_PATH ?? "./data/astromind.db";
  mkdirSync(dirname(url), { recursive: true });
  const sqlite = new Database(url);
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      empresa TEXT,
      mensaje TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
    );
  `);
  singleton = drizzle(sqlite, { schema });
  return singleton;
}
