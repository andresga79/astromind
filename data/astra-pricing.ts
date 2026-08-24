export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
}

export const astraPricing: PricingPlan[] = [
  {
    name: "Starter",
    price: "$99.000",
    description: "/mes",
    features: [
      "1 canal (WhatsApp o Instagram)",
      "Hasta 500 conversaciones al mes",
      "Respuestas en segundos",
      "Reportes básicos",
    ],
    cta: "Agendar demo",
    href: "https://calendly.com/astromind/astra",
  },
  {
    name: "Pro",
    price: "$199.000",
    description: "/mes",
    features: [
      "Canales ilimitados",
      "Conversaciones ilimitadas",
      "Calificación automática de leads",
      "Agendamiento integrado",
      "Reportes avanzados",
    ],
    cta: "Agendar demo",
    href: "https://calendly.com/astromind/astra",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "A consultar",
    description: "",
    features: [
      "Todo lo incluido en Pro",
      "Integraciones a medida",
      "SLA y soporte prioritario",
      "Onboarding dedicado",
    ],
    cta: "Hablar con ventas",
    href: "https://calendly.com/astromind/astra",
  },
];
