import { astraPricing } from "@/data/astra-pricing";

export default function AstraPricing() {
  return (
    <section className="astra-section astra-pricing" id="precios">
      <div className="container">
        <p className="section-eyebrow">Precios</p>
        <h2>Planes para cada etapa</h2>
        <div className="pricing-grid">
          {astraPricing.map((plan) => (
            <div
              className={`pricing-card${plan.highlighted ? " is-highlighted" : ""}`}
              key={plan.name}
            >
              <h3>{plan.name}</h3>
              <p className="pricing-price">
                {plan.price}
                {plan.description ? <span>{plan.description}</span> : null}
              </p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className="btn btn-primary"
                href={plan.href}
                rel="noreferrer"
                target="_blank"
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
