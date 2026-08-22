# Spec — Migración Astromind a Next.js + TypeScript

Fecha: 2026-08-22
Estado: aprobado en conversación (usuario delegó la redacción)
Superficie: landing astromind.cl (Persuade, español/tuteo) + API de contacto

## Objetivo

Migrar el landing estático actual (`/home/andres/astromind/`: index.html +
styles.css + app.js) a un stack moderno listo para integrar después WhatsApp
Cloud API y Google Calendar, sin implementar esas integraciones ahora.

Decisiones confirmadas por el dueño:

- **Frontend**: Next.js (App Router) + TypeScript
- **Deploy**: servidor propio con Docker
- **Datos**: SQLite + Drizzle ORM
- **Alcance**: landing + estructura de integraciones (sin integraciones activas)

## No-objetivos

- Implementar WhatsApp Cloud API o Google Calendar (solo tipos + README).
- Rediseñar el landing: el HTML/CSS/JS actual se porta 1:1; el veredicto
  *ship* del finish review y sus contrastes WCAG verificados se conservan.
- Backoffice/admin para ver leads (se consulta la tabla directamente).

## Arquitectura

```
astromind/
├── app/
│   ├── layout.tsx              <html lang="es">, fuentes, metadata, OG, canonical
│   ├── page.tsx                el landing (server component; JSX del HTML actual)
│   ├── globals.css             styles.css actual, casi literal
│   └── api/
│       ├── contact/route.ts    POST: zod → honeypot → rate-limit → Drizzle insert
│       └── health/route.ts     GET: {ok:true} para HEALTHCHECK de Docker
├── components/                 client components donde hay interactividad
│   ├── Header.tsx              nav + toggle móvil (44px, aria-expanded, Esc)
│   ├── Starfield.tsx           canvas (prefers-reduced-motion, pausa en hidden)
│   ├── AgentDemo.tsx           maqueta animada del agente (el momento firmado)
│   ├── ContactForm.tsx         validación inline + estados + fetch /api/contact
│   ├── Faq.tsx                 details/summary nativo (sin JS)
│   └── sections/               Hero, Servicios, Productos, Casos, Tools, Contacto
├── lib/
│   ├── db/
│   │   ├── schema.ts           tabla leads (patrón para tablas futuras)
│   │   ├── client.ts           better-sqlite3 + drizzle singleton
│   │   └── migrations/         drizzle-kit
│   ├── validations/contact.ts  zod: nombre≥2, email, empresa opcional, mensaje≥10
│   └── integraciones/
│       ├── whatsapp/           tipos webhook + README (META_APP_ID, verify_token)
│       └── calendar/           tipos OAuth Google + README (scopes, redirect)
├── data/                       astromind.db (gitignored, volumen Docker)
├── Dockerfile                  multi-stage → standalone, node:22-alpine, no-root
├── docker-compose.yml          volumen data/, env_file .env
├── drizzle.config.ts
├── .env.example                DB_PATH, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS
└── package.json
```

## Componentes y comportamiento

### Client vs server
Todo es server component por defecto. Client components exactamente donde hay
estado/eventos: `Starfield`, `AgentDemo`, `ContactForm`, `Header` (toggle).
FAQ usa `<details>` nativo — sin JS. El contrato de dirección (comentario HTML
hijo de `<body>`) se conserva en `app/layout.tsx`.

### API `/api/contact`
- Contrato de entrada idéntico al actual: `{nombre, email, empresa?, mensaje}`
  (`Content-Type: application/json`).
- Orden: honeypot (campo `web` oculto; si viene lleno → responde `{ok:true}`
  y no inserta) → rate-limit en memoria por IP (default 5 req / 10 min) →
  zod → insert.
- Respuestas: 200 `{ok:true}` · 400 `{error:"Datos incompletos o inválidos."}`
  (mismo texto que el sitio en producción) · 429 `{error:"Demasiados envíos.
  Inténtalo de nuevo en unos minutos."}`.
- El cliente mantiene los mensajes actuales: "Enviando…", éxito con plazo de
  24h hábiles, error que preserva el borrador.

### Datos
```ts
leads: id (int pk autoincrement), nombre (text), email (text),
       empresa (text nullable), mensaje (text),
       created_at (integer unix, default now)
```
Migraciones con drizzle-kit (`npm run db:migrate`). La BD se crea/enruta
automáticamente al primer arranque; `data/` se ignora en git.

### Integraciones futuras (estructura solamente)
- `lib/integraciones/whatsapp/README.md`: pasos Meta for Developers, variables
  de entorno (`WHATSAPP_VERIFY_TOKEN`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_ID`),
  formato del GET de verificación (hub.challenge) y del POST de mensajes.
  `tipos.ts` con interfaces del payload, sin lógica.
- `lib/integraciones/calendar/README.md`: Google Cloud Console, OAuth 2.0,
  scopes `calendar.events` + `calendar.readonly`, redirect URI y almacenamiento
  del refresh token. `tipos.ts` con tipos del flujo, sin lógica.

## Errores y edge cases
- BD no disponible → 500 con el mismo texto de red del cliente actual.
- Payload no-JSON → 400.
- `empresa` vacío → se guarda null.
- Rate-limit en memoria es por instancia (documentado; suficiente para 1 contenedor).

## Docker
- Build: `npm ci` → `next build` con `output: "standalone"`.
- Runtime: `node:22-alpine`, usuario no-root, `HEALTHCHECK CMD curl -f
  http://localhost:3000/api/health`.
- Compose: puerto 3000, volumen `./data:/app/data`, `env_file: .env`.

## Testing y verificación
- **Vitest**: `lib/validations/contact.ts` (casos válidos/inválidos por campo) y
  `app/api/contact/route.ts` (handler directo con SQLite temporal: ok, 400 zod,
  honeypot, rate-limit).
- **Lint/typecheck**: `next lint` y `tsc --noEmit` deben pasar limpios.
- **Build**: `next build` sin errores; `docker compose build` exitoso.
- **Humo**: `docker compose up` → GET / devuelve el landing con H1 correcto,
  POST /api/contact inserta un lead visible en SQLite.

## Migración y despliegue
1. Se construye dentro de `/home/andres/astromind/` (los archivos estáticos
   viejos se eliminan al quedar portados; PRODUCT.md y DESIGN.md se conservan).
2. Sin downtime: el DNS de astromind.cl sigue apuntando al sitio actual hasta
   que el contenedor esté verificado; el cambio de DNS es manual, del dueño.
3. Pendientes previos ya registrados: fuente para métricas 75/85/40 (TODO en
   el landing) y redirect HTTP→HTTPS en el reverse proxy del servidor.

## Riesgos
- Portar el CSS a JSX puede introducir desvíos visuales → el port es literal
  (mismas clases, mismo orden); verificación con el detector + diff manual.
- better-sqlite3 es nativo → en Docker se compila en la etapa de build con
  los build-args correctos de Alpine (musl); probado en el smoke test.
