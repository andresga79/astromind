import ContactForm from "@/components/ContactForm";

/* CONTACTO */
export default function Contacto() {
  return (
    <section className="section" id="contacto" aria-labelledby="contacto-title">
      <div className="container contacto-grid">
        <div className="section-lead">
          <h2 id="contacto-title">Empecemos por tu diagnóstico</h2>
          <p>
            Cuéntanos qué proceso te está quitando tiempo. Respondemos con un
            diagnóstico inicial sin costo y una propuesta a medida según tu
            operación.
          </p>
          <ul className="contacto-bullets">
            <li>Diagnóstico inicial sin costo</li>
            <li>Propuesta a medida según tu operación</li>
            <li>Acompañamiento durante todo el desarrollo</li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
