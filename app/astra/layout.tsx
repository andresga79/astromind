import type { Metadata } from "next";
import "./astra.css";
import AstraHeader from "@/components/astra/AstraHeader";
import AstraFooter from "@/components/astra/AstraFooter";

export const metadata: Metadata = {
  title: "Astra — Agente de IA para atender clientes 24/7",
  description:
    "Astra responde, califica y agenda citas por ti en WhatsApp, Instagram y correo. Nunca pierdas una venta por no alcanzar a responder.",
  alternates: { canonical: "https://astra.astromind.cl/" },
  openGraph: {
    type: "website",
    siteName: "Astra by Astromind",
    title: "Astra — Agente de IA para atender clientes 24/7",
    description:
      "Astra responde, califica y agenda citas por ti en WhatsApp, Instagram y correo.",
    url: "https://astra.astromind.cl/",
    locale: "es_CL",
  },
  twitter: { card: "summary" },
};

export default function AstraLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AstraHeader />
      {children}
      <AstraFooter />
    </>
  );
}
