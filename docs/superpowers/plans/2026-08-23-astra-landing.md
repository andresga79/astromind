# Astra Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` (inline) or `superpowers:subagent-driven-development`.

**Goal:** Implementar el landing de producto Astra en `astra.astromind.cl` con middleware, layout, componentes y secciones definidas en el spec.

**Architecture:** 
- `middleware.ts` detecta host `astra.*` y reescribe `/` a `/astra`.
- Ruta `app/astra/` provee layout y página propios anidados en el root layout.
- Componentes aislados en `components/astra/` y datos en `data/astra-*.ts`.

**Tech Stack:** Next.js 15, React 19, TypeScript, CSS puro, `next/font/google` (ya configurado en root).

**Spec:** `docs/superpowers/specs/2026-08-23-astra-landing-design.md`

## Global Constraints

- Identidad "dark cósmico": bg `#030407`, acento cian `#2fa8e0`, starfield.
- Tuteo en todo el copy.
- Precios y testimonios placeholders.
- CTAs de precios a link Calendly placeholder.
- `npm run typecheck`, `npm run lint`, `npm run build` y tests existentes deben pasar.

---

### Task 1: Middleware de subdominio

**Files:**
- Create: `middleware.ts`

**Interfaces:**
- `export function middleware(req: NextRequest): NextResponse`
- Rewrites root of `astra.*` host to `/astra`; skips static files.

**Steps:**
- [ ] 1. Crear `middleware.ts`:
  ```ts
  import { NextRequest, NextResponse } from 'next/server';

  export function middleware(req: NextRequest) {
    const host = req.headers.get('host') ?? '';
    const url = req.nextUrl.clone();
    if (host.startsWith('astra.') && url.pathname === '/') {
      url.pathname = '/astra';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
  };
  ```
- [ ] 2. Verificar `npm run typecheck`.

---

### Task 2: Layout y metadata de Astra

**Files:**
- Create: `app/astra/layout.tsx`
- Create: `app/astra/page.tsx`
- Create: `app/astra/astra.css`

**Interfaces:**
- Layout exporta metadata para Astra.
- Layout importa `astra.css`.
- Page renderiza todas las secciones.

**Steps:**
- [ ] 1. Crear layout con metadata Astra.
- [ ] 2. Crear `astra.css` con estilos específicos de Astra, reutilizando variables de `globals.css`.
- [ ] 3. Crear page.tsx como contenedor de secciones.

---

### Task 3: Componentes Astra

**Files:**
- Create: `components/astra/AstraHeader.tsx`
- Create: `components/astra/AstraFooter.tsx`
- Create: `components/astra/AstraHero.tsx`
- Create: `components/astra/AstraChatDemo.tsx`
- Create: `components/astra/AstraChannels.tsx`
- Create: `components/astra/AstraHowItWorks.tsx`
- Create: `components/astra/AstraFeatures.tsx`
- Create: `components/astra/AstraPricing.tsx`
- Create: `components/astra/AstraFaq.tsx`
- Create: `components/astra/AstraCta.tsx`

**Interfaces:**
- Cada componente es una unidad visual sin props externas (usa datos locales o data files).
- `AstraChatDemo` es cliente; el resto pueden ser server components.

**Steps:**
- [ ] 1. Implementar Header con navegación y CTA.
- [ ] 2. Implementar Hero con copy y `AstraChatDemo`.
- [ ] 3. Implementar `AstraChatDemo` con burbujas de chat animadas y soporte `prefers-reduced-motion`.
- [ ] 4. Implementar Canales, Cómo funciona, Features, Pricing, FAQ y CTA final.
- [ ] 5. Implementar Footer.

---

### Task 4: Datos

**Files:**
- Create: `data/astra-pricing.ts`
- Create: `data/astra-faq.ts`

**Interfaces:**
- `PricingPlan[]` y `FaqItem[]` exportados.

**Steps:**
- [ ] 1. Definir 3 planes placeholder con precios, features y CTA.
- [ ] 2. Definir 4-5 preguntas y respuestas de FAQ.

---

### Task 5: Integración y verificación

**Files:**
- Modify: `app/astra/page.tsx`

**Steps:**
- [ ] 1. Ensamblar todas las secciones en `page.tsx`.
- [ ] 2. Correr `npm run typecheck`.
- [ ] 3. Correr `npm run lint`.
- [ ] 4. Correr `npm run build`.
- [ ] 5. Correr `npm test`.
- [ ] 6. Verificar visualmente `localhost:3000/astra`.
- [ ] 7. Verificar `astra.localhost:3000` vía header `Host` (curl).
