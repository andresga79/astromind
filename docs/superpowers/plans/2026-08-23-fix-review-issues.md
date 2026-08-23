# Fix Review Issues Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) or superpowers:subagent-driven-development.

**Goal:** Corregir los problemas detectados en la revisión del proyecto astromind para que `lint`, `typecheck` y `test` pasen, las migraciones corran automáticamente en Docker y el README documente cómo levantar el proyecto.

**Architecture:** Hacer que los tests sean autónomos levantando un contenedor Postgres efímero mediante un `globalSetup` de Vitest, sin alterar el camino productivo hacia Postgres. Agregar un stage `migrate` al Dockerfile y orquestarlo desde docker-compose con healthcheck de la base de datos. Limpiar el artefacto SQLite heredado, completar el README y migrar las fuentes externas de Google Fonts a `next/font/google`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Drizzle ORM, PGlite (dev dependency), Docker, docker-compose, Vitest.

**Spec:** Revisión del proyecto astromind del mensaje anterior.

## Global Constraints

- La imagen de runtime debe seguir siendo pequeña (`output: standalone`).
- No inventar claims, métricas o productos; dejar los placeholders de Casos.tsx tal como están.
- Mantener el tuteo y el copy en español.
- No agregar dependencias de runtime innecesarias.
- Todos los cambios deben pasar `npm run typecheck`, `npm run lint`, `npm test` y `docker compose config`.

---

### Task 1: Limpiar artefacto SQLite heredado

**Files:**
- Delete: `data/astromind.db`
- Modify: `.gitignore`

**Interfaces:**
- Ninguna.

**Steps:**

- [ ] 1. Eliminar el archivo `data/astromind.db`.
- [ ] 2. Quitar la línea `data/` de `.gitignore`.
- [ ] 3. Si `data/` queda vacío, eliminar el directorio.
- [ ] 4. Verificar con `git status` que solo se registren cambios esperados.

---

### Task 2: Hacer los tests autónomos con Docker Postgres

**Files:**
- Modify: `lib/db/client.ts`
- Modify: `app/api/contact/route.ts`
- Modify: `lib/db/client.test.ts`
- Modify: `app/api/contact/route.test.ts`
- Create: `lib/test/global-setup.ts`
- Modify: `vitest.config.mts`

**Interfaces:**
- `getDb()` sigue siendo síncrono y retorna una instancia de Drizzle con `postgres-js`.
- Los tests usan `DATABASE_URL=postgresql://postgres:postgres@localhost:55432/astromind_test`.
- `lib/test/global-setup.ts` levanta un contenedor Postgres efímero antes de los tests y lo detiene al terminar.
- `vitest.config.mts` apunta al `globalSetup` y desactiva `fileParallelism` para evitar interferencias entre archivos.

**Steps:**

- [ ] 1. Revertir `lib/db/client.ts` al cliente Postgres síncrono.

- [ ] 2. En `app/api/contact/route.ts`, dejar `const db = getDb();` (síncrono).

- [ ] 3. En `lib/db/client.test.ts` y `app/api/contact/route.test.ts`, usar:
  ```ts
  process.env.DATABASE_URL ??= 'postgresql://postgres:postgres@localhost:55432/astromind_test';
  ```

- [ ] 4. Crear `lib/test/global-setup.ts` que gestione el contenedor `astromind-test-db` con `docker run`, espere con `pg_isready` y lo detenga en `teardown`.

- [ ] 5. Actualizar `vitest.config.mts`:
  ```ts
  test: {
    globalSetup: './lib/test/global-setup.ts',
    fileParallelism: false,
  },
  ```

- [ ] 6. Correr `npm test` y confirmar que todos los tests pasan.

---

### Task 3: Ejecutar migraciones automáticamente en Docker

**Files:**
- Modify: `Dockerfile`
- Modify: `docker-compose.yml`

**Interfaces:**
- Nuevo stage `migrate` en el Dockerfile, basado en el stage `build`, que ejecuta `npm run db:migrate`.
- `docker-compose.yml` agrega healthcheck al servicio `db`, un servicio `migrate` que espera a `db` saludable, y `web` espera a que `migrate` termine.

**Steps:**

- [ ] 1. En `Dockerfile`, insertar antes del stage `runtime`:
  ```dockerfile
  FROM build AS migrate
  ENV NODE_ENV=production
  CMD ["npm", "run", "db:migrate"]
  ```
  Asegurar que `runtime` sea el último stage (target por defecto).

- [ ] 2. En `docker-compose.yml`, agregar healthcheck al servicio `db`:
  ```yaml
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres -d astromind"]
    interval: 5s
    timeout: 5s
    retries: 10
  ```

- [ ] 3. Agregar el servicio `migrate`:
  ```yaml
  migrate:
    build:
      context: .
      target: migrate
    env_file:
      - .env
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/astromind
    depends_on:
      db:
        condition: service_healthy
    restart: "no"
  ```

- [ ] 4. Actualizar `depends_on` de `web`:
  ```yaml
  depends_on:
    migrate:
      condition: service_completed_successfully
  ```
  Y agregar el override de `DATABASE_URL` apuntando al host `db`.

- [ ] 5. Validar la sintaxis con `docker compose config`.

---

### Task 4: Actualizar README.md

**Files:**
- Modify: `README.md`

**Interfaces:**
- Ninguna.

**Steps:**

- [ ] 1. Escribir `README.md` con:
  - Descripción del proyecto.
  - Stack.
  - Setup local: copiar `.env.example` a `.env`, levantar Postgres (`docker compose up db -d`), `npm install`, `npm run db:migrate`, `npm run dev`.
  - Tests: `npm test` (usa PGlite en memoria).
  - Producción con Docker: `docker compose up --build`.
  - Nota sobre migraciones automáticas y sobre rellenar métricas reales en `components/sections/Casos.tsx`.

---

### Task 5: Corregir warning de fuentes con next/font/google

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- `layout.tsx` exporta las fuentes `Inter` y `Space_Grotesk` como variables CSS.
- `globals.css` usa esas variables en `--font-display` y `--font-body`.

**Steps:**

- [ ] 1. En `app/layout.tsx`, importar fuentes desde `next/font/google`:
  ```ts
  import { Inter, Space_Grotesk } from 'next/font/google';

  const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
  const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });
  ```
  Eliminar el `<head>` manual con los `<link>` de Google Fonts y aplicar las variables:
  ```tsx
  <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
    <body>{children}</body>
  </html>
  ```

- [ ] 2. En `app/globals.css`, actualizar las variables:
  ```css
  --font-display: var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif;
  --font-body: var(--font-inter), 'Inter', system-ui, -apple-system, sans-serif;
  ```

- [ ] 3. Correr `npm run lint` y confirmar que el warning de fuentes desaparece.

---

### Task 6: Verificación final

**Files:**
- Ninguno.

**Steps:**

- [ ] 1. `npm run typecheck`
- [ ] 2. `npm run lint`
- [ ] 3. `npm test`
- [ ] 4. `docker compose config`
