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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
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
