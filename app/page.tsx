import Header from "@/components/Header";
import Faq from "@/components/Faq";
import Hero from "@/components/sections/Hero";
import Servicios from "@/components/sections/Servicios";
import Productos from "@/components/sections/Productos";
import Tools from "@/components/sections/Tools";
import Contacto from "@/components/sections/Contacto";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">Astromind Tecnología</p>
        <nav aria-label="Navegación del pie">
          <ul className="footer-nav">
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#productos">Productos</a>
            </li>
            <li>
              <a href="#faq">Preguntas</a>
            </li>
            <li>
              <a href="#contacto">Contacto</a>
            </li>
          </ul>
        </nav>
        <p className="footer-copy">
          Software a medida, automatización e inteligencia artificial · Chile
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <Header />
      <main id="main">
        <span id="top" />
        <Hero />
        <Servicios />
        <Productos />

        <Tools />
        <Contacto />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
