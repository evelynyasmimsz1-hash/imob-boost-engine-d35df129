import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/imob-flow-lab-logo.jpg.asset.json";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoAsset.url} alt="Imob Flow Lab" className="h-9 w-9 object-contain" />
          <span className="text-sm font-semibold tracking-tight">Imob Flow Lab</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="/#metodo" className="hover:text-foreground transition">Método</a>
          <a href="/#provas" className="hover:text-foreground transition">Resultados</a>
          <a href="/#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <Link
          to="/agendar"
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition"
        >
          Agendar sessão
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background mt-24">
      <div className="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src={logoAsset.url} alt="" className="h-6 w-6 object-contain" />
          <span>© {new Date().getFullYear()} Imob Flow Lab. Todos os direitos reservados.</span>
        </div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground">Privacidade</a>
          <a href="#" className="hover:text-foreground">Termos</a>
          <a href="mailto:contato@imobflowlab.com" className="hover:text-foreground">Contato</a>
        </div>
      </div>
    </footer>
  );
}
