# Astra Landing Design Spec

> **For agentic workers:** this spec feeds into `superpowers:writing-plans`.

**Goal:** Crear un landing de producto independiente para Astra (agente de IA de Astromind) accesible en `astra.astromind.cl`, con identidad visual coherente con Astromind y orientado a convertir visitantes en demos agendadas.

**Architecture:** 
- Next.js App Router con `middleware.ts` que detecta el host `astra.astromind.cl` y reescribe la raíz a `/astra`.
- Ruta `app/astra/` con layout y página propios, anidados dentro del root layout que provee fuentes y tokens CSS.
- Componentes en `components/astra/` reutilizando `components/Starfield.tsx` y los tokens de `app/globals.css`.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS puro (siguiendo el patrón actual del sitio), `next/font/google`.

## Global Constraints

- Mantener identidad "dark cósmico": bg `#030407`, acento cian `#2fa8e0`, starfield.
- Tuteo en todo el copy.
- No inventar datos reales; usar placeholders para precios y testimonios.
- No agregar pasarela de pago; los CTAs de precios van a un link de Calendly placeholder.
- Cumplir `npm run typecheck`, `npm run lint`, `npm run build` y los tests existentes.

## Page Sections

1. **Header** fijo: logo Astra (by Astromind), anclas a Funciones / Precios / FAQ, CTA "Agendar demo".
2. **Hero**: H1 "Un agente de IA que responde, califica y agenda por ti", subtítulo, CTA a demo, y a la derecha `AstraChatDemo`.
3. **Canales**: iconos WhatsApp, Instagram, correo, web.
4. **Cómo funciona**: 3 pasos con íconos.
5. **Features**: grid de 6 tarjetas.
6. **Pricing**: 3 tiers placeholder (Starter / Pro / Enterprise) con lista de features y botón a Calendly.
7. **FAQ**: 4-5 preguntas usando componente `details/summary` accesible.
8. **CTA final**: "Agenda tu demo" + link Calendly.
9. **Footer**: link a `astromind.cl`, email, créditos.

## Components

- `AstraHeader`
- `AstraFooter`
- `AstraHero`
- `AstraChatDemo`
- `AstraChannels`
- `AstraHowItWorks`
- `AstraFeatures`
- `AstraPricing`
- `AstraFaq`
- `AstraCta`

## Data

- `data/astra-pricing.ts`: arrays de planes.
- `data/astra-faq.ts`: preguntas y respuestas.

## Middleware

- `middleware.ts` en la raíz del proyecto.
- Si el host comienza con `astra.` y el pathname es `/`, reescribe a `/astra`.
- Archivos estáticos (`/_next`, `/favicon.svg`, etc.) se saltan.

## Testing

- `npm run typecheck` pasa.
- `npm run lint` pasa.
- `npm run build` pasa.
- Tests existentes pasan.
- Verificación visual manual de `localhost:3000/astra` y `astra.localhost:3000` (vía header `Host`).
