import Link from "next/link";

export default function AstraHeader() {
  return (
    <header className="astra-header">
      <div className="container header-inner">
        <Link className="astra-brand" href="/">
          Astra <span className="astra-brand-by">by Astromind</span>
        </Link>
        <nav aria-label="Astra" className="astra-nav">
          <a href="#funciones">Funciones</a>
          <a href="#precios">Precios</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a
          className="btn btn-primary btn-sm"
          href="https://calendly.com/astromind/astra"
          rel="noreferrer"
          target="_blank"
        >
          Agendar demo
        </a>
      </div>
    </header>
  );
}
