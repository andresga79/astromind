# astromind

One-pager de Astromind Tecnología: software a medida, automatización e
inteligencia artificial aplicada para pymes chilenas.

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

- Revisa `PRODUCT.md` para claims pendientes, como las métricas reales del caso
  Bitácora en `components/sections/Casos.tsx`.
