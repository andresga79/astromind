# astromind

One-pager de Astromind centrado en **Astra**, el agente de IA que responde,
clasifica y agenda por tu negocio las 24 horas en WhatsApp, Instagram y correo.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Drizzle ORM + Postgres
- Docker + docker-compose

## Setup local

```bash
cp .env.example .env
# Levanta Postgres local
docker compose up db -d
npm install
npm run db:migrate
npm run dev
```

La app estará en http://localhost:3000.

## Tests

```bash
npm test
```

Los tests levantan automáticamente un contenedor Postgres efímero con Docker,
por lo que necesitas Docker corriendo localmente.

## Build y producción con Docker

```bash
docker compose up --build
```

Las migraciones se ejecutan automáticamente antes de levantar el servicio web.

## Notas

- `DATABASE_URL` en `.env` apunta al Postgres local (puerto 5433). El full-stack
  Docker (db, migrate, web) se levanta con `docker compose up --build`.
