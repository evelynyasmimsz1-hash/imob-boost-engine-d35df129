import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { useEffect, useRef } from "react";

const GHL_CALENDAR_URL = "https://api.leadconnectorhq.com/widget/booking/i00BtuRjIRubmkoO9PTB";

export const Route = createFileRoute("/agendar")({
  head: () => ({
    meta: [
      { title: "Agendar sessão estratégica — Imob Flow Lab" },
      { name: "description", content: "Escolha o melhor horário para sua sessão estratégica gratuita com o time da Imob Flow Lab." },
      { property: "og:title", content: "Agendar sessão estratégica — Imob Flow Lab" },
      { property: "og:description", content: "Reserve 30 minutos com nosso time e descubra como aplicar I.A. para vender mais imóveis." },
    ],
  }),
  component: AgendarPage,
});

function AgendarPage() {
  const scriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptRef.current) return;
    const existing = document.getElementById("ghl-form-embed-script");
    if (existing) return;
    const script = document.createElement("script");
    script.id = "ghl-form-embed-script";
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    scriptRef.current.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="hero-bg border-b border-border">
        <div className="container-page pt-14 pb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Passo 1 de 2 — Escolha um horário
          </div>
          <h1 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight">
            Agende sua sessão estratégica gratuita
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Após escolher o horário, você será direcionado a uma página com um vídeo curto e essencial para preparar nossa conversa.
          </p>
        </div>
      </section>

      <section className="container-page py-12 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="rounded-3xl border border-border bg-card p-3 shadow-elevated overflow-hidden">
          <iframe
            src={GHL_CALENDAR_URL}
            title="Agendamento Imob Flow Lab"
            className="w-full rounded-2xl"
            style={{ height: "780px", border: "none", overflow: "hidden" }}
            scrolling="no"
            id="i00BtuRjIRubmkoO9PTB_1781406068482"
          />
          <div ref={scriptRef} />
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">O que esperar</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3"><span className="text-success">✓</span> 30 minutos via Google Meet</li>
              <li className="flex gap-3"><span className="text-success">✓</span> Diagnóstico do seu funil atual</li>
              <li className="flex gap-3"><span className="text-success">✓</span> Plano de I.A. personalizado</li>
              <li className="flex gap-3"><span className="text-success">✓</span> Projeção realista de 90 dias</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-primary text-primary-foreground p-6 shadow-soft">
            <h3 className="text-sm font-semibold uppercase tracking-widest opacity-70">Importante</h3>
            <p className="mt-3 text-sm leading-relaxed opacity-90">
              Para garantir o melhor uso do seu tempo, agende apenas se você for decisor na imobiliária e estiver pronto para implementar em até 30 dias.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft text-sm text-muted-foreground">
            Já agendou?{" "}
            <Link to="/pre-call" className="text-foreground font-medium underline underline-offset-4">
              Acesse a página de preparação →
            </Link>
          </div>
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}
