import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

let singleton: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (singleton) return singleton;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL no está definida");
  const sql = postgres(url);
  singleton = drizzle(sql, { schema });
  return singleton;
}
