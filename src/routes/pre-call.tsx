import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

// TODO: substitua pelo embed da sua VSL (YouTube/Vimeo/Wistia)
const VSL_EMBED_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1";

export const Route = createFileRoute("/pre-call")({
  head: () => ({
    meta: [
      { title: "Prepare-se para a sessão — Imob Flow Lab" },
      { name: "description", content: "Assista ao vídeo de preparação antes da sua sessão estratégica com o time da Imob Flow Lab." },
      { property: "og:title", content: "Prepare-se para a sessão — Imob Flow Lab" },
      { property: "og:description", content: "Vídeo essencial antes da nossa conversa: o que ver, o que trazer e como aproveitar ao máximo." },
    ],
  }),
  component: PreCallPage,
});

function PreCallPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="hero-bg border-b border-border">
        <div className="container-page pt-14 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Passo 2 de 2 — Assista antes da chamada
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">
            Sua sessão está confirmada. Assista esse vídeo antes da nossa conversa.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Em menos de 8 minutos você entende o método, vê cases reais e chega na nossa reunião pronto para sair com um plano de ação.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mx-auto max-w-4xl">
          <div className="aspect-video w-full overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
            <iframe
              src={VSL_EMBED_URL}
              title="Vídeo de preparação — Imob Flow Lab"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">1. Assista</div>
              <p className="mt-2 text-sm">Veja o vídeo até o final — todas as dúvidas comuns são respondidas nele.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">2. Anote</div>
              <p className="mt-2 text-sm">Liste suas metas de vendas, número de corretores e investimento atual em ads.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">3. Chegue no horário</div>
              <p className="mt-2 text-sm">A reunião dura 30 min. Entre 2 minutos antes pelo link enviado no e-mail.</p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-primary text-primary-foreground p-8 md:p-12 text-center shadow-elevated">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Para aproveitar 100% da sessão</h2>
            <p className="mt-3 opacity-80 max-w-xl mx-auto text-sm">
              Esteja em um lugar tranquilo, com áudio e vídeo funcionando, e — se possível — com um sócio ou gestor comercial junto.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3 text-sm text-left max-w-xl mx-auto">
              <li className="flex gap-3"><span className="text-accent">✓</span> Conexão estável de internet</li>
              <li className="flex gap-3"><span className="text-accent">✓</span> Câmera ligada</li>
              <li className="flex gap-3"><span className="text-accent">✓</span> Decisor presente</li>
              <li className="flex gap-3"><span className="text-accent">✓</span> Metas de vendas em mãos</li>
            </ul>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Precisa reagendar?{" "}
            <a href="mailto:contato@imobflowlab.com" className="text-foreground underline underline-offset-4">
              Fale com a gente
            </a>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
