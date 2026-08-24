import { astraFaq } from "@/data/astra-faq";

export default function AstraFaq() {
  return (
    <section className="astra-section astra-faq" id="faq">
      <div className="container">
        <p className="section-eyebrow">Preguntas frecuentes</p>
        <h2>FAQ</h2>
        <div className="faq-list">
          {astraFaq.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>{item.question}</summary>
              <div className="faq-body">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
