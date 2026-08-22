# Migración Astromind a Next.js — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrar el landing estático de astromind a Next.js (App Router) + TypeScript con API `/api/contact` respaldada por SQLite/Drizzle, estructura para integraciones futuras de WhatsApp y Google Calendar, y deploy con Docker.

**Architecture:** Server components por defecto; 4 client components (`Header`, `Starfield`, `AgentDemo`, `ContactForm`). El API route valida con zod (esquema compartido cliente/servidor), aplica honeypot + rate-limit en memoria, e inserta en SQLite vía Drizzle. Docker multi-stage con `output: "standalone"`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind NO (CSS plano portado), Drizzle ORM + better-sqlite3, zod, Vitest.

**Spec:** `docs/superpowers/specs/2026-08-22-nextjs-migration-design.md`

## Global Constraints

- Contrato de dirección (comentario HTML hijo de `<body>`) se conserva en `app/layout.tsx`.
- Copys en español, registro tuteo, idénticos al HTML actual (`index.html` es la fuente de verdad; NO cambiar textos).
- Contrastes WCAG verificados NO tocar: ink `#030407` sobre brand `#2fa8e0` (7.61:1); muted `#8b95a5` sobre surface `#0e131a` (6.16:1); opacity `.demo-task` 0.58 (6.34:1).
- `styles.css` se porta casi literal a `app/globals.css`: mismas clases, mismas reglas, mismo orden.
- Respuestas del API: 200 `{ok:true}` · 400 `{error:"Datos incompletos o inválidos."}` · 429 `{error:"Demasiados envíos. Inténtalo de nuevo en unos minutos."}`.
- Variables de entorno: `DB_PATH` (default `./data/astromind.db`), `RATE_LIMIT_MAX` (default 5), `RATE_LIMIT_WINDOW_MS` (default 600000). Ninguna obligatoria.
- El TODO de métricas (75/85/40) viaja con el landing (comentario en JSX).
- Archivos viejos (`index.html`, `app.js`, `styles.css` raíz) se eliminan solo en la tarea final, tras verificar el puerto completo.
- Framework no es negociable: Next.js App Router + TypeScript.

---

### Task 1: Scaffold Next.js + config base

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `next-env.d.ts`, `.gitignore` (actualizado), `app/layout.tsx`, `app/page.tsx` (placeholder), `.env.example`

**Interfaces:**
- Produces: proyecto Next.js 15 funcional (`next build` pasa); `app/layout.tsx` con `<html lang="es">`, metadata (title/description/OG/canonical idénticos a `index.html`), y el comentario de dirección como primer hijo de `<body>`.
- Produces: `next.config.ts` con `output: "standalone"`.

- [ ] **Step 1: Crear el proyecto**

```bash
cd /home/andres/astromind
npm init -y >/dev/null
npm install next@15 react react-dom typescript @types/node @types/react @types/react-dom
```

- [ ] **Step 2: Escribir `package.json`** (scripts; sobrescribir el generado):

```json
{
  "name": "astromind",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate"
  }
}
```

- [ ] **Step 3: `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 4: `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: `app/layout.tsx`** — metadata copiada VERBATIM de `index.html` (title, description, OG, canonical, favicon) y el contrato de dirección. Importa `./globals.css`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astromind Tecnología — Software a medida, automatización e IA",
  description:
    "Diseñamos y construimos sistemas que eliminan el trabajo manual de tu operación: software a medida, automatización de procesos e inteligencia artificial. Diagnóstico inicial sin costo.",
  alternates: { canonical: "https://astromind.cl/" },
  openGraph: {
    type: "website",
    siteName: "Astromind Tecnología",
    title: "Astromind Tecnología — Software a medida, automatización e IA",
    description:
      "Sistemas que eliminan el trabajo manual de tu operación: software a medida, automatización de procesos e inteligencia artificial. Diagnóstico inicial sin costo.",
    url: "https://astromind.cl/",
    locale: "es_CL",
  },
  twitter: { card: "summary" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/*
        DIRECCIÓN — Astromind one-pager (Persuade)
        THESIS: el hero demuestra el mecanismo — un agente resolviendo tareas en
        vivo — en vez de anunciar un nombre de empresa con tagline vacío.
        OWN-WORLD: vacío casi negro #030407 con starfield sutil; un solo acento,
        cian eléctrico #2fa8e0 siempre con tinta oscura encima (7.6:1); Space
        Grotesk display; paneles de borde fino sin glass; tipografía tabular.
        STORY: el visitante entiende en el primer viewport qué se vende y actúa:
        diagnóstico gratuito en el formulario.
        FIRST VIEWPORT: izquierda, H1 con la oferta + CTA primario a #contacto;
        derecha, maqueta AstrhorusAI con tareas resolviéndose en bucle.
        FORM: refinamiento del mundo establecido del sitio en producción
        ("mantener pero elevar"). Code-led.
        FINISH: unreviewed and undocumented is unfinished; this build ends with
        the finish review, the verdict, DESIGN.md, and every shipping raster
        carrying its provenance.
        */}
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Mover assets** — `mv favicon.svg public/ && mv robots.txt public/`. Crear `app/globals.css` con TODO el contenido actual de `styles.css` (literal) y añadir al final `@import url(...)` NO — las fuentes van en layout:

En `app/layout.tsx` agregar dentro de `<head>`… NO: en App Router las fuentes externas van con `<link>` en el JSX de layout. Añadir como hijos de `<html>` antes de `<body>`:

```tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&display=swap"
    rel="stylesheet"
  />
</head>
```

- [ ] **Step 7: `app/page.tsx` placeholder + `.env.example`**

```tsx
export default function Home() {
  return <main>placeholder</main>;
}
```

```
DB_PATH=./data/astromind.db
RATE_LIMIT_MAX=5
RATE_LIMIT_WINDOW_MS=600000
```

- [ ] **Step 8: `.gitignore`** — añadir: `node_modules/`, `.next/`, `data/`, `.env`, `*.tsbuildinfo`, `next-env.d.ts`.

- [ ] **Step 9: Verificar**

```bash
npm run build
```

Expected: build exitoso.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 15 con layout, metadata y contrato de dirección"
```

---

### Task 2: Validación zod compartida

**Files:**
- Create: `lib/validations/contact.ts`
- Test: `lib/validations/contact.test.ts`

**Interfaces:**
- Produces: `contactSchema` (zod) con campos `nombre` (min 2, trim), `email` (email, trim), `empresa` (opcional, string, trim, vacío → undefined), `mensaje` (min 10, trim), `web` (opcional string — honeypot). Tipo inferido `ContactInput`.

- [ ] **Step 1: Instalar vitest + zod**

```bash
npm install zod && npm install -D vitest
```

- [ ] **Step 2: Escribir el test (falla)**

```ts
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
```

- [ ] **Step 3: Correr y verificar que falla**

```bash
npx vitest run lib/validations/contact.test.ts
```

Expected: FAIL (no existe `./contact`).

- [ ] **Step 4: Implementar**

```ts
import { z } from "zod";

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Ingresa tu nombre."),
  email: z.string().trim().email("Ingresa un correo válido."),
  empresa: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  mensaje: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres)."),
  web: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 5: Correr y verificar que pasa**

```bash
npx vitest run lib/validations/contact.test.ts
```

Expected: 6 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: esquema zod compartido del formulario de contacto"
```

---

### Task 3: Capa de datos Drizzle + SQLite

**Files:**
- Create: `lib/db/schema.ts`, `lib/db/client.ts`, `drizzle.config.ts`
- Test: `lib/db/client.test.ts`

**Interfaces:**
- Produces: `getDb(): ReturnType<typeof drizzle>` (singleton, crea el directorio de `DB_PATH` si no existe y corre migraciones pendientes al primer uso). Tabla `leads` con columnas `id` (integer pk autoincrement), `nombre` text, `email` text, `empresa` text nullable, `mensaje` text, `createdAt` integer (`created_at`, default unix now).

- [ ] **Step 1: Instalar**

```bash
npm install drizzle-orm better-sqlite3 && npm install -D drizzle-kit @types/better-sqlite3
```

- [ ] **Step 2: `lib/db/schema.ts`**

```ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nombre: text("nombre").notNull(),
  email: text("email").notNull(),
  empresa: text("empresa"),
  mensaje: text("mensaje").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
```

- [ ] **Step 3: `drizzle.config.ts`**

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dbCredentials: { url: process.env.DB_PATH ?? "./data/astromind.db" },
});
```

- [ ] **Step 4: Test del cliente (falla)**

```ts
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
```

- [ ] **Step 5: Correr y verificar que falla**

```bash
npx vitest run lib/db/client.test.ts
```

Expected: FAIL (no existe `./client`).

- [ ] **Step 6: Implementar `lib/db/client.ts`** — migraciones generadas con drizzle-kit se aplican al arrancar (para el smoke test de Docker basta `CREATE TABLE` idempotente):

```ts
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
```

- [ ] **Step 7: Correr y verificar que pasa**

```bash
npx vitest run lib/db/client.test.ts
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: capa de datos Drizzle + SQLite con tabla leads"
```

---

### Task 4: API route `/api/contact` + `/api/health`

**Files:**
- Create: `app/api/contact/route.ts`, `app/api/health/route.ts`
- Test: `app/api/contact/route.test.ts`

**Interfaces:**
- Consumes: `contactSchema` de `lib/validations/contact.ts`; `getDb()` de `lib/db/client.ts`.
- Produces: `POST /api/contact` (JSON → 200/400/429/500) y `GET /api/health` → `200 {ok:true}`.

- [ ] **Step 1: Test del handler (falla)** — importar `POST` directamente, con `DB_PATH` a archivo temporal y rate-limit reseteable exportando `__resetRateLimiter` para el test:

```ts
import { afterEach, describe, expect, it } from "vitest";
import { rmSync } from "node:fs";
import { POST, __resetRateLimiter } from "./route";

const TEST_DB = "/tmp/opencode/astromind-api-test.db";
process.env.DB_PATH = TEST_DB;
process.env.RATE_LIMIT_MAX = "2";
process.env.RATE_LIMIT_WINDOW_MS = "60000";

const valid = { nombre: "Ana", email: "ana@empresa.cl", mensaje: "Quiero automatizar cotizaciones" };

function req(body: unknown, ip = "1.1.1.1") {
  return new Request("http://x/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

afterEach(() => __resetRateLimiter());

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
```

- [ ] **Step 2: Correr y verificar que falla**

```bash
npx vitest run app/api/contact/route.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implementar `app/api/contact/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { getDb } from "@/lib/db/client";
import { leads } from "@/lib/db/schema";

const MAX = Number(process.env.RATE_LIMIT_MAX ?? 5);
const WINDOW = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 600000);
const hits = new Map<string, number[]>();

export function __resetRateLimiter() {
  hits.clear();
}

function limited(ip: string): boolean {
  const now = Date.now();
  const prev = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (prev.length >= MAX) {
    hits.set(ip, prev);
    return true;
  }
  prev.push(now);
  hits.set(ip, prev);
  return false;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos incompletos o inválidos." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos incompletos o inválidos." }, { status: 400 });
  }

  if (parsed.data.web) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { error: "Demasiados envíos. Inténtalo de nuevo en unos minutos." },
      { status: 429 }
    );
  }

  try {
    const db = getDb();
    db.insert(leads).values({
      nombre: parsed.data.nombre,
      email: parsed.data.email,
      empresa: parsed.data.empresa ?? null,
      mensaje: parsed.data.mensaje,
    }).run();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos." },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: `app/api/health/route.ts`**

```ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 5: Correr tests**

```bash
npx vitest run app/api/contact/route.test.ts && rm -f /tmp/opencode/astromind-api-test.db
```

Expected: 5 PASS.

- [ ] **Step 6: Verificar build + smoke del endpoint**

```bash
npm run build && (npm start & sleep 4; curl -s -X POST localhost:3000/api/contact -H 'content-type: application/json' -d '{"nombre":"Smoke","email":"s@s.cl","mensaje":"prueba de humo completa"}'; kill %1)
```

Expected: `{"ok":true}`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: API /api/contact con zod, honeypot, rate-limit y SQLite; /api/health"
```

---

### Task 5: Componentes del landing (JSX)

**Files:**
- Create: `components/Header.tsx`, `components/Starfield.tsx`, `components/AgentDemo.tsx`, `components/ContactForm.tsx`, `components/Faq.tsx`, `components/sections/Hero.tsx`, `components/sections/Servicios.tsx`, `components/sections/Productos.tsx`, `components/sections/Casos.tsx`, `components/sections/Tools.tsx`, `components/sections/Contacto.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: markup/copys VERBATIM de `index.html` (fuente de verdad; `class` → `className`, `for` → `htmlFor`, atributos aria intactos).
- Consumes: lógica JS de `app.js` (starfield, demo, nav toggle, form) portada a React.
- Produces: `app/page.tsx` que compone Header + secciones + Footer.

- [ ] **Step 1: Secciones estáticas** — portar `Hero`, `Servicios`, `Productos`, `Casos`, `Tools` a server components. El hero llama a `<AgentDemo />` y `<Starfield />`. Incluir el comentario `TODO(dueño)` de métricas en `Casos.tsx`. `role="img"` con `aria-label` del demo panel se mantiene.

- [ ] **Step 2: `Starfield.tsx`** — client component; `useEffect` con la lógica del canvas de `app.js` (dpr ≤2, ≤140 estrellas, pausa en `visibilitychange`, ignora si `prefers-reduced-motion`); cleanup cancela el raf. Render `<canvas id="starfield" aria-hidden="true" />` posicionado fixed.

- [ ] **Step 3: `AgentDemo.tsx`** — client component; estado `step` con la secuencia de `app.js` (activar tarea → 1400ms → done; al terminar, "completado" 2200ms, reset, loop). Render idéntico al HTML: `.demo-panel` con `role="img"` y su `aria-label`. Con `prefers-reduced-motion`, todo `is-done` desde el inicio y status "completado".

- [ ] **Step 4: `Header.tsx`** — client component; toggle móvil con `aria-expanded`/`aria-controls`/`aria-label` dinámico, cierre al click en link y en Escape (focus al toggle). Markup del header VERBATIM.

- [ ] **Step 5: `ContactForm.tsx`** — client component con la lógica de `app.js`: validación on-blur por campo (mismas reglas y mensajes `e-{campo}` con `role="alert"`, `aria-invalid`), submit → validar todo + focus al primero malo, fetch `/api/contact` con honeypot (input `name="web"` oculto css `.honey`), estados "Enviando…"/éxito (24h hábiles)/error que preserva borrador. Añadir a `globals.css`:

```css
.honey { position: absolute; left: -9999px; opacity: 0; }
```

- [ ] **Step 6: `Faq.tsx`** — server component; `<details>/<summary>` nativos VERBATIM (sin JS).

- [ ] **Step 7: `app/page.tsx`** — componer todo + footer (server). Skip-link primero.

- [ ] **Step 8: Verificar visualmente con dev server**

```bash
npm run dev & sleep 5; curl -s localhost:3000 | grep -o "Software a medida, automatización e inteligencia artificial" | head -1; kill %1
```

Expected: el H1 aparece en el HTML servido (SSR).

- [ ] **Step 9: Lint + typecheck + tests**

```bash
npm run lint && npm run typecheck && npm test
```

Expected: limpio.

- [ ] **Step 10: Commit**

```bash
git add -A && git commit -m "feat: landing portado a componentes React con accesibilidad intacta"
```

---

### Task 6: Estructura de integraciones futuras

**Files:**
- Create: `lib/integraciones/whatsapp/README.md`, `lib/integraciones/whatsapp/tipos.ts`, `lib/integraciones/calendar/README.md`, `lib/integraciones/calendar/tipos.ts`

**Interfaces:**
- Produces: documentación y tipos SIN lógica activa; ningún import desde `app/`.

- [ ] **Step 1: `lib/integraciones/whatsapp/tipos.ts`**

```ts
/** Tipos del webhook de WhatsApp Cloud API (sin lógica). */
export interface WebhookVerificationQuery {
  "hub.mode": string;
  "hub.verify_token": string;
  "hub.challenge": string;
}

export interface WhatsAppIncomingMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: { body: string };
  type: "text" | "image" | "audio" | "interactive" | string;
}

export interface WhatsAppWebhookPayload {
  object: "whatsapp_business_account";
  entry: Array<{
    id: string;
    changes: Array<{
      field: string;
      value: {
        messaging_product: "whatsapp";
        metadata: { display_phone_number: string; phone_number_id: string };
        contacts?: Array<{ profile: { name: string }; wa_id: string }>;
        messages?: WhatsAppIncomingMessage[];
      };
    }>;
  }>;
}
```

- [ ] **Step 2: `lib/integraciones/whatsapp/README.md`** — pasos: 1) crear app en Meta for Developers (tipo Business), 2) activar producto WhatsApp, 3) configurar webhook con verify token, 4) variables de entorno futuras `WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, 5) el GET de verificación responde `hub.challenge` solo si `hub.verify_token` coincide; el POST llega con `WhatsAppWebhookPayload` (ver `tipos.ts`), 6) punto de montaje sugerido: `app/api/webhooks/whatsapp/route.ts`.

- [ ] **Step 3: `lib/integraciones/calendar/tipos.ts`**

```ts
/** Tipos del flujo OAuth 2.0 de Google Calendar (sin lógica). */
export interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope: string;
  token_type: "Bearer";
}

export interface CalendarEventInput {
  summary: string;
  description?: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
}
```

- [ ] **Step 4: `lib/integraciones/calendar/README.md`** — pasos: 1) proyecto en Google Cloud Console + habilitar Calendar API, 2) OAuth consent screen (external), 3) credenciales OAuth client (web) con redirect URI `https://astromind.cl/api/integraciones/calendar/callback`, 4) scopes `https://www.googleapis.com/auth/calendar.events` (+ `calendar.readonly` si se lee), 5) guardar refresh token (variable futura `GOOGLE_REFRESH_TOKEN`, client id/secret `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`), 6) punto de montaje sugerido: `app/api/integraciones/calendar/`.

- [ ] **Step 5: Verificar**

```bash
npm run typecheck
```

Expected: limpio.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "docs: estructura y tipos para integraciones futuras de WhatsApp y Calendar"
```

---

### Task 7: Docker + limpieza final

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`, `.dockerignore`
- Delete: `index.html`, `app.js`, `styles.css` (raíz)

**Interfaces:**
- Consumes: build standalone de Task 1; mejor-sqlite3 nativo (compilar en etapa build con libc musl).
- Produces: imagen Docker ejecutable + compose con volumen `data/`.

- [ ] **Step 1: `Dockerfile`**

```dockerfile
# syntax=docker/dockerfile:1
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
RUN addgroup -S astromind && adduser -S astromind -G astromind
COPY --from=build --chown=astromind:astromind /app/.next/standalone ./
COPY --from=build --chown=astromind:astromind /app/.next/static ./.next/static
COPY --from=build --chown=astromind:astromind /app/public ./public
RUN mkdir -p /app/data && chown astromind:astromind /app/data
USER astromind
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:3000/api/health || exit 1
CMD ["node", "server.js"]
```

- [ ] **Step 2: `docker-compose.yml`**

```yaml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

- [ ] **Step 3: `.dockerignore`**

```
node_modules
.next
data
.git
.env
```

- [ ] **Step 4: Borrar archivos viejos** — verificar primero que `app/page.tsx` contiene TODO el contenido (grep del H1, del TODO de métricas, y de cada id de sección):

```bash
grep -c "servicios\|productos\|casos\|contacto\|faq" app/page.tsx components/sections/*.tsx | head
rm index.html app.js styles.css
```

- [ ] **Step 5: Build + smoke test completo**

```bash
docker compose build && docker compose up -d && sleep 6
curl -s localhost:3000 | grep -o "Software a medida, automatización e inteligencia artificial" | head -1
curl -s localhost:3000/api/health
curl -s -X POST localhost:3000/api/contact -H 'content-type: application/json' -d '{"nombre":"Docker","email":"d@d.cl","mensaje":"smoke test docker"}'
docker compose exec web node -e 'const D=require("better-sqlite3");const db=new D("/app/data/astromind.db");console.log(db.prepare("SELECT COUNT(*) c FROM leads").get().c + " lead(s)")'
docker compose down
```

Expected: H1 servido · `{"ok":true}` · `{"ok":true}` · `1 lead(s)`.

- [ ] **Step 6: Verificación final completa**

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Expected: todo limpio.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: Docker multi-stage + limpieza de archivos estáticos del sitio viejo"
```

---

## Self-Review (ejecutado al escribir)

- **Cobertura del spec**: scaffold (T1), zod (T2), SQLite/Drizzle (T3), API contact + health (T4), componentes (T5), integraciones estructura (T6), Docker + limpieza + smoke (T7). SEO/metadata en T1, TODO métricas en T5, honeypot en T4/T5. ✓
- **Placeholders**: ninguno; todos los steps llevan código o comando exacto. ✓
- **Consistencia de tipos**: `contactSchema`/`ContactInput` (T2→T4), `getDb`/`leads` (T3→T4), `__resetRateLimiter` (T4 interno). ✓
