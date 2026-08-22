---
name: Astromind Tecnología
description: One-pager "dark cósmico elevado" — near-black void, one electric cyan accent, Space Grotesk display, an agent demo panel as the single authored motion moment.
colors:
  bg: "#030407"
  ink: "#030407"
  surface: "#0e131a"
  surface-2: "#121822"
  line: "rgba(170, 179, 191, 0.16)"
  text: "#f3f6f9"
  text-2: "#aab3bf"
  muted: "#8b95a5"
  brand: "#2fa8e0"
  brand-strong: "#63c2ec"
  error-border: "#e5484d"
  error-text: "#ff8a8d"
  scrollbar-thumb: "#2a3242"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 3.2vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, Inter, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.3vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3rem)"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1.5rem"
    height: "48px"
  button-ghost-hover:
    textColor: "{colors.brand-strong}"
    rounded: "{rounded.sm}"
  badge-live:
    backgroundColor: "rgba(47, 168, 224, 0.16)"
    textColor: "{colors.brand-strong}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  badge-lab:
    backgroundColor: "rgba(170, 179, 191, 0.12)"
    textColor: "{colors.text-2}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.7rem"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "0.75rem 1rem"
    height: "48px"
  input-error:
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
---

# Design System: Astromind Tecnología

## Overview

**Creative North Star: "The Quiet Observatory"**

A near-black observatory field: the void (`#030407`) is the dominant material, a subtle drifting starfield gives it depth without decoration, and one electric cyan instrument — the brand accent — carries every point of attention. This is the incumbent visual world of astromind.cl ("dark cósmico", owner decision: keep but elevate), refined code-first: same hues, same faces, tighter discipline. Depth comes from thin borders, two tonal surface steps, and one shadowed hero object — never from glass, gradients, or glow.

The world's single authored motion moment is the agent demo panel in the hero: a ledger of tasks resolving themselves in a loop while a status dot pulses. Everything else is calm — 160ms state transitions, a slow starfield drift, no scroll animations, no reveals. Typography is two incumbent brand faces kept deliberately: Space Grotesk for display (geometric, slightly technical) and Inter for body (neutral, high legibility), with tabular numerals wherever the interface reports data — demo tasks, pilot metrics, status.

Contrast is a system value, not an afterthought: every key pair in this document was WCAG-verified (see Colors). All interactive targets are at least 44×44px.

**Key Characteristics:**
- One-accent discipline: cyan `#2fa8e0` is the only hue; it always carries dark ink text on top, never white.
- Flat, bordered surfaces on two tonal steps; a single shadowed object (the demo panel) per view.
- Ledger lists and editorial rows instead of card grids for anything content-bearing.
- One authored motion moment (demo panel); starfield as ambient secondary; full reduced-motion shutdown.
- Browser chrome (selection, scrollbar, caret, focus ring) is themed from the palette.

## Colors

A monochrome dark field with one electric accent and a functional red reserved for errors only.

### Primary
- **Electric Cyan** (`#2fa8e0`): the single brand accent. Primary buttons, nav hover edge, active task rings, check icons, contact bullets, the favicon star. WCAG-verified: **7.61:1 on bg** and **7.61:1 under ink** (ink `#030407` on cyan = the primary-button pair).
- **Cyan Bright** (`#63c2ec`): the hover/strong step of the accent. Button hover, ghost-link hover text, focus outlines, badge-live text, pilot metric numbers, FAQ "+" toggle. Used wherever the accent needs to read at smaller sizes or on surface.

### Neutral
- **Void** (`#030407`): page background, input background (fields cut into surfaces by being darker), ink-on-accent text.
- **Surface** (`#0e131a`): panels — demo panel body, product cards, contact form.
- **Surface Raised** (`#121822`): one step up — demo head and hover-row background, the lead product card, nav link hover.
- **Text** (`#f3f6f9`): primary body text.
- **Text Secondary** (`#aab3bf`): subtitles, body copy inside panels and rows.
- **Muted** (`#8b95a5`): tertiary copy — hero note, demo foot, labels, footer copy. WCAG-verified: **6.16:1 on surface**.
- **Hairline** (`rgba(170, 179, 191, 0.16)`): every border and divider in the system. Thin (1px) and low-alpha; borders replace shadows almost everywhere.
- **Scrollbar Grey** (`#2a3242`): scrollbar thumb on void track (browser surface).

### Functional
- **Error Border** (`#e5484d`): invalid field border only.
- **Error Text** (`#ff8a8d`): inline error messages and error status lines, the lighter red legible on dark surfaces.

### Named Rules
**The One Instrument Rule.** Cyan is the only hue on any screen. Its rarity is the point: if two elements compete for accent, one of them is wrong. The accent never appears as large background fields beyond buttons and the 9px demo dot.

**The Ink-On-Cyan Rule.** The accent always carries dark ink text (`#030407` on `#2fa8e0` = 7.61:1), never white. Cyan as text is reserved for the bright step (`#63c2ec`) or larger display sizes.

**The Verified Pair Rule.** Any new text/background pair must be checked against WCAG AA before shipping. Established pairs: ink on brand 7.61:1; muted on surface 6.16:1; brand on bg 7.61:1; demo-task dimmed text (text on surface at `opacity: 0.58`) 6.34:1.

## Typography

**Display Font:** Space Grotesk (fallback: Inter, system-ui, sans-serif)
**Body Font:** Inter (fallback: system-ui, -apple-system, sans-serif)

**Character:** Incumbent brand faces kept deliberately — Space Grotesk gives headings a geometric, faintly technical voice; Inter stays invisible so content does the persuading. Tight negative tracking on display sizes keeps the dark field dense and calm.

### Hierarchy
- **Display** (600, `clamp(2rem, 1.4rem + 3.2vw, 3.6rem)`, line-height 1.08, −0.03em): the H1 offer in the hero; `max-width: 16ch`, `text-wrap: balance`.
- **Headline** (600, `clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem)`, line-height 1.15, −0.025em): section H2s.
- **Title** (600, 1.35–1.5rem, −0.02em): H3s — service names, product names; also demo-panel metric numbers (`clamp(1.8rem, 1.4rem + 1.5vw, 2.6rem)` in Space Grotesk 600).
- **Body** (400, `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)`, line-height 1.65): all paragraphs; measure caps of 42–62ch per role.
- **Label** (600, 0.75rem, +0.05em, uppercase): badges only. Small meta copy (0.8–0.9rem, regular weight) plays the secondary-label role.

### Named Rules
**The Tabular Data Rule.** Any text that reports numbers — demo task lines, status, pilot metrics — uses `font-variant-numeric: tabular-nums`, so digits don't dance as the demo loops.

**The Two-Face Rule.** No third typeface enters this world. Display is always Space Grotesk 500–600; body is always Inter 400–500. No system display faces, no decorative fonts.

## Layout

Single-page vertical flow, one section per scroll beat. Container: `max-width: 1200px`, centered, `padding-inline: clamp(1.25rem, 4vw, 3rem)` (the `--gutter` token). Section rhythm: `padding-block: clamp(3.5rem, 9vh, 6rem)`, with a hairline `border-top` separating adjacent sections — the divider carries the structure, not background changes.

The recurring editorial pattern is an asymmetric two-column grid (`minmax(0, 5fr) minmax(0, 7fr)`, gap `clamp(2rem, 5vw, 4rem)`): a sticky section-lead column (`top: 96px`) beside a ledger of rows. The hero inverts it (7fr/6fr) to pair copy with the demo panel. Product cards are the only two-up grid (`1fr 1fr`, gap 1.25rem).

### Breakpoints
- **≤980px**: all two-column grids collapse to one column (gap 2.5rem); sticky leads become static; product grid stacks.
- **≤820px**: mobile nav appears — the header toggle (44×44px) opens a full-width dropdown panel under the header; hero tightens; footer stacks.
- **≤640px**: the demo panel is allowed to bleed slightly out of the gutter (`margin-inline: calc(var(--gutter) * -0.5)`); ledger rows collapse to a single column, numbers left-aligned.

Accessibility floor: all nav links, footer links, the product link, and the nav toggle hold a **44px minimum height**; the skip-link is the first focusable element and lands top-left on focus.

## Elevation & Depth

Depth is tonal and bordered, not shadowed. Surfaces stack by background value (void → surface → surface-2) and are always edged with the 1px hairline; that edge — not blur or shadow — is what defines an object in this world.

Exactly one shadow exists in the system: the hero demo panel (`0 24px 48px -24px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4)`). It marks the page's single most important object and would be diluted if any other element carried one.

The sticky header is the one glass-adjacent surface: `rgba(3, 4, 7, 0.88)` with `backdrop-filter: blur(8px)` — the direction contract bans glass panels, and the header is a deliberate narrow exception for scroll legibility, not a license.

### Shadow Vocabulary
- **Hero Object** (`box-shadow: 0 24px 48px -24px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4)`): demo panel only. No other element shadows.

### Named Rules
**The One Shadow Rule.** One shadowed object per view. If a second element seems to need elevation, give it a surface step and a hairline instead.

## Shapes

Corners follow a three-step scale: soft-small (10px) for controls — buttons, inputs, nav pills, skip-link; medium (16px) for demo task rows; large (24px) for panels — demo panel, product cards, contact form. The badge is the only full pill (999px), as are the 50% circular elements (demo dot, task rings, contact bullet rings) — circles belong to the "instrument" vocabulary: status indicators and the star mark (favicon: a 4-point star in cyan on a 7px-radius void tile).

The silhouette language is rectangular and calm: nothing clips, nothing rotates (except the FAQ "+" rotating 45° to an "×"), no skewed or organic shapes.

## Components

### Buttons
- **Shape:** softly rounded corners (10px radius), min-height 48px, padding 0.75rem 1.5rem, Space Grotesk 600 at 1rem.
- **Primary:** cyan `#2fa8e0` with ink `#030407` text. Hover/focus: brightens to `#63c2ec` (160ms ease-out). Active: `translateY(1px)` — a 1px settle, never a bounce.
- **Ghost:** transparent with hairline border and text color; hover/focus swaps to brand border + `#63c2ec` text.
- **Submit:** primary at full form width; disabled state is `opacity: 0.6` + `cursor: progress`.

### Badges
- **Style:** uppercase labels (0.75rem, 600, +0.05em) as pills (999px), padding 0.3rem 0.7rem, always paired with a 1px border.
- **Live** ("en producción"): cyan-tinted — `rgba(47,168,224,0.16)` fill, `#63c2ec` text, cyan border at 0.35 alpha.
- **Lab** ("en investigación"): neutral — `rgba(170,179,191,0.12)` fill, secondary text, hairline border. Status honesty is encoded here: shipped things get the accent, research things don't.

### Ledger Rows (servicios, casos, contacto bullets, FAQ)
The system's signature content pattern: full-width rows separated by hairlines, not cards. Each row is a bordered-bottom block (padding 0.65–1.75rem block) with a Space Grotesk term on the left and detail right; pilot metrics set the number in cyan Space Grotesk (tabular) with a muted caption under it. First row loses its top padding; lists never get outer borders — the section divider does that job.

### Demo Panel (signature component — the one authored motion moment)
A 24px-radius surface panel with hairline border and the system's only shadow. Three zones divided by hairlines: a raised head (9px pulsing cyan dot at 2.4s, Space Grotesk title, tabular status text right-aligned), the task ledger (padding 0.5rem), and a muted foot. Tasks live in three states: **dimmed** (text at `opacity: 0.58`, 6.34:1), **active** (full opacity, raised background, cyan ring pulsing at 1.2s), **done** (full opacity, secondary text, cyan-filled ring with an ink checkmark). The JS loop activates each task at 1400ms, holds "completado" for 2200ms, resets and restarts. Under `prefers-reduced-motion`: all tasks render done, status reads "completado", no loop.

### Inputs / Fields
- **Style:** void background cut into the form surface, hairline border, 10px radius, min-height 48px (textarea 120px), padding 0.75rem 1rem.
- **Focus:** 2px `#63c2ec` outline (offset 1px) plus border shift to brand.
- **Error:** `aria-invalid="true"` swaps border to `#e5484d`; the message below is `#ff8a8d` at 0.875rem with `role="alert"`. Validation is inline on blur; submit focuses the first invalid field and reports via a polite live region (error red / ok cyan / neutral secondary states).

### Navigation
Sticky header (min-height 64px), brand star mark (26px) + Space Grotesk wordmark left; four anchor links right in Inter 500 with 44px targets — rest in secondary text, hover/focus in full text on surface-2 pill (10px radius, 160ms). ≤820px: two-bar hamburger toggle (44×44, bars morph to an × on expand) drops a full-width void panel with stacked full-width links; closes on link click or Escape, focus returns to the toggle.

### FAQ (details/summary)
Native `<details>` disclosure styled as ledger rows. Summary is a 56px-min flex row: Space Grotesk 500 at 1.1rem, a cyan "+" (1.4rem) on the right that rotates 45° into an "×" when open (200ms ease-out). Hover/focus shifts summary text to `#63c2ec`. Body copy in secondary text, capped at 62ch. No marker icon fonts — the "+" is a text pseudo-element.

### Browser Surfaces
The palette reaches the browser chrome: text selection is cyan with ink text; the caret is `#63c2ec`; the scrollbar (10px) uses `#2a3242` thumbs (5px radius) on a void track; the global focus-visible ring is 2px `#63c2ec` at 2px offset. `color-scheme: dark` on `:root`.

### Starfield (ambient, secondary)
A fixed full-viewport canvas behind everything (`z-index: -1`, `pointer-events: none`): up to 140 stars in `#aab3bf`, radius 0.3–1.4px, alpha 0.15–0.65 with a slow twinkle, drifting upward at 0.03px/frame. DPR capped at 2; paused on `visibilitychange`; completely absent under reduced motion. It is atmosphere, never content — nothing interactive lives in it.

## Do's and Don'ts

### Do:
- **Do** keep cyan as the only hue and give it ink text (7.61:1); use `#63c2ec` for accent text at small sizes.
- **Do** build depth with surface steps (`#0e131a` → `#121822`) and 1px hairlines before considering a shadow.
- **Do** use the asymmetric 5fr/7fr grid with a sticky lead column for content sections; use ledger rows for lists.
- **Do** set `font-variant-numeric: tabular-nums` on every numeric interface text.
- **Do** hold interactive targets at ≥44px and theme browser surfaces (selection, caret, scrollbar, focus ring) from the palette.
- **Do** honor `prefers-reduced-motion`: static done-state demo, no starfield, no smooth scroll, transitions collapsed to 0.01ms.

### Don't:
- **Don't** add a second accent color, gradient, or glow — the void + one cyan instrument is the world.
- **Don't** shadow more than one object per view; the demo panel owns the system's only shadow.
- **Don't** use glass/backdrop-blur panels — the sticky header's blur is a scroll-legibility exception, not a pattern.
- **Don't** ship a text/background pair without a WCAG check; the four verified pairs are the floor, not the ceiling.
- **Don't** replace ledger rows with card grids, or add a third typeface, or introduce scroll-triggered reveals — motion here is one authored moment plus 160ms state changes.
- **Don't** use white text on cyan, or cyan `#2fa8e0` for small text where `#63c2ec` is the legible choice.
