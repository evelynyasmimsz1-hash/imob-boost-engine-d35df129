import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import logoAsset from "@/assets/imob-flow-lab-logo.jpg.asset.json";
import rafaelImg from "@/assets/testimonial-rafael.jpg";
import camilaImg from "@/assets/testimonial-camila.jpg";
import marcosImg from "@/assets/testimonial-marcos.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imob Flow Lab — Venda 6 a 8 imóveis a mais por mês com I.A." },
      { name: "description", content: "Sistema com Inteligência Artificial que prospecta, qualifica e agenda visitas para sua imobiliária no automático. Agende uma sessão estratégica gratuita." },
      { property: "og:title", content: "Imob Flow Lab — Mais vendas para sua imobiliária com I.A." },
      { property: "og:description", content: "Aumente em 6 a 8 vendas/mês com um funil de I.A. que captura, qualifica e agenda os melhores leads." },
      { property: "og:image", content: logoAsset.url },
    ],
  }),
  component: Home,
});

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 shadow-soft">
      <div className="text-3xl md:text-4xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function StepCard({ n, title, desc, icon }: { n: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="group relative rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:shadow-elevated hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-foreground text-background">
          {icon}
        </div>
        <span className="text-xs font-mono text-muted-foreground">{n}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function Testimonial({ name, role, quote, img }: { name: string; role: string; quote: string; img: string }) {
  return (
    <figure className="rounded-2xl border border-border bg-card p-7 shadow-soft hover:shadow-elevated transition">
      <div className="flex gap-0.5 text-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78L1.58 7.62l5.82-.85L10 1.5z"/></svg>
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <img src={img} alt={name} width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full object-cover" />
        <div className="text-xs">
          <div className="font-semibold">{name}</div>
          <div className="text-muted-foreground">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-xl border border-border bg-card p-5 shadow-soft open:shadow-elevated">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
        {q}
        <span className="ml-4 text-muted-foreground transition group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
    </details>
  );
}

function HeroDashboard() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] opacity-60 blur-2xl"
        style={{ background: "var(--gradient-accent)" }} />

      {/* Main card */}
      <div className="rounded-3xl border border-border bg-card p-5 shadow-elevated">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <div className="text-[10px] font-mono text-muted-foreground">flow.imobflowlab.com</div>
          <div className="text-[10px] text-success flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" /> ao vivo
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-muted/60 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Leads hoje</div>
            <div className="mt-1 text-xl font-semibold">37</div>
            <div className="text-[10px] text-success">+12%</div>
          </div>
          <div className="rounded-xl bg-muted/60 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Qualificados</div>
            <div className="mt-1 text-xl font-semibold">14</div>
            <div className="text-[10px] text-success">+38%</div>
          </div>
          <div className="rounded-xl bg-muted/60 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Visitas</div>
            <div className="mt-1 text-xl font-semibold">9</div>
            <div className="text-[10px] text-success">+22%</div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-4 rounded-xl border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium">Pipeline de vendas — últimos 30 dias</div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="h-2 w-2 rounded-sm" style={{ background: "var(--gradient-accent)" }} /> Receita
            </div>
          </div>
          <svg viewBox="0 0 320 80" className="mt-3 w-full h-20">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,60 C30,55 50,40 80,42 C110,44 130,30 160,25 C190,20 210,28 240,18 C270,8 290,12 320,5 L320,80 L0,80 Z" fill="url(#g1)" />
            <path d="M0,60 C30,55 50,40 80,42 C110,44 130,30 160,25 C190,20 210,28 240,18 C270,8 290,12 320,5" fill="none" stroke="oklch(0.74 0.18 45)" strokeWidth="2" />
          </svg>
          <div className="mt-1 flex justify-between text-[9px] text-muted-foreground font-mono">
            <span>S1</span><span>S2</span><span>S3</span><span>S4</span>
          </div>
        </div>

        {/* Pipeline rows */}
        <div className="mt-4 space-y-2">
          {[
            { n: "Mariana Costa", v: "Apto 3Q · Vila Nova · R$ 780k", s: "Quente", c: "bg-success/15 text-success" },
            { n: "Pedro Almeida", v: "Casa · Jd. Europa · R$ 1.2M", s: "Visita 14h", c: "bg-accent/25 text-foreground" },
            { n: "Júlia Ferreira", v: "Cobertura · Centro · R$ 2.1M", s: "Negociação", c: "bg-muted text-foreground" },
          ].map((r) => (
            <div key={r.n} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-7 w-7 rounded-full bg-muted grid place-items-center text-[10px] font-semibold">
                  {r.n.split(" ").map(w => w[0]).slice(0,2).join("")}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium truncate">{r.n}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{r.v}</div>
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${r.c}`}>{r.s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating WhatsApp card */}
      <div className="hidden md:block absolute -left-10 -bottom-8 w-64 rounded-2xl border border-border bg-card p-4 shadow-elevated animate-float">
        <div className="flex items-center gap-2 border-b border-border pb-2">
          <div className="h-7 w-7 rounded-full bg-success grid place-items-center text-background">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4A10 10 0 0 0 4.5 17l-1.5 5 5.2-1.4A10 10 0 1 0 20 4Zm-3.6 13.2c-.3.8-1.7 1.5-2.4 1.5s-1.5 0-4.7-1.7c-3.4-1.8-5.6-5.4-5.7-5.6-.2-.2-1.4-1.9-1.4-3.6 0-1.7.9-2.6 1.2-3 .3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.5.6c-.2.2-.4.4-.2.7.2.4.9 1.4 1.9 2.3 1.3 1.1 2.4 1.5 2.7 1.6.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.2 1.1c.3.1.5.2.6.4.1.2.1 1-.3 1.7Z"/></svg>
          </div>
          <div>
            <div className="text-xs font-semibold">Flow I.A.</div>
            <div className="text-[10px] text-success">qualificando agora</div>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground px-3 py-1.5 text-[11px] text-background">Oi! Vi seu interesse no Apto Vila Nova 👋</div>
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-muted px-3 py-1.5 text-[11px]">Sim, ainda está disponível?</div>
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-foreground px-3 py-1.5 text-[11px] text-background">Está! Posso agendar uma visita amanhã 14h?</div>
        </div>
      </div>

      {/* Floating calendar tile */}
      <div className="hidden md:block absolute -right-8 -top-6 w-52 rounded-2xl border border-border bg-card p-4 shadow-elevated animate-float" style={{ animationDelay: "1.5s" }}>
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold">Próxima visita</div>
          <span className="rounded-full bg-success/15 px-2 py-0.5 text-[9px] font-medium text-success">confirmada</span>
        </div>
        <div className="mt-3 text-2xl font-semibold tracking-tight">14:00</div>
        <div className="text-[11px] text-muted-foreground">Apto 3Q · Vila Nova</div>
        <div className="mt-3 flex -space-x-1.5">
          <div className="h-6 w-6 rounded-full bg-accent border-2 border-card" />
          <div className="h-6 w-6 rounded-full bg-success border-2 border-card" />
          <div className="h-6 w-6 rounded-full bg-muted border-2 border-card grid place-items-center text-[9px]">+2</div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative hero-bg overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="container-page relative pt-16 pb-28 md:pt-20 md:pb-36">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
                Sistema operando em +40 imobiliárias no Brasil
              </div>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                Venda <span className="text-gradient">6 a 8 imóveis</span> a mais por mês com Inteligência Artificial
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Um sistema completo de aquisição com I.A. que prospecta, qualifica e agenda visitas com compradores reais — sem depender só de portais ou indicação.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/agendar"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition shadow-elevated"
                >
                  Agendar sessão estratégica gratuita →
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img src={rafaelImg} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-background" />
                    <img src={camilaImg} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-background" />
                    <img src={marcosImg} alt="" className="h-8 w-8 rounded-full object-cover border-2 border-background" />
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78L1.58 7.62l5.82-.85L10 1.5z"/></svg>
                      ))}
                    </div>
                    <span>4.9/5 — 120+ diretores</span>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                Vagas limitadas • Conversa de 30 min • Sem compromisso
              </p>
            </div>

            <div className="lg:pl-6">
              <HeroDashboard />
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-5xl grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="+6-8" label="imóveis/mês adicionais" />
            <Stat value="3x" label="mais visitas qualificadas" />
            <Stat value="-62%" label="custo por lead" />
            <Stat value="24/7" label="atendimento por I.A." />
          </div>
        </div>
      </section>

      {/* LOGOS — marquee */}
      <section className="border-y border-border bg-card overflow-hidden">
        <div className="container-page py-8">
          <div className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Imobiliárias que escalam com o Flow
          </div>
        </div>
        <div className="relative pb-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-14 items-center text-base font-semibold tracking-tight text-foreground/60">
                <span>PRIME IMÓVEIS</span>
                <span>•</span>
                <span>ALTA VISTA</span>
                <span>•</span>
                <span>URBE NEGÓCIOS</span>
                <span>•</span>
                <span>CASA & CIA</span>
                <span>•</span>
                <span>NEXT LAR</span>
                <span>•</span>
                <span>ATRIO PRIME</span>
                <span>•</span>
                <span>HABITAR+</span>
                <span>•</span>
                <span>VEREDA IMÓVEIS</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="container-page py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">O problema</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              Leads caros, corretores ocupados e agenda vazia.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A maioria das imobiliárias depende de portais lotados, indicação ou tráfego pago mal estruturado. O resultado? Centenas de contatos frios, corretores sobrecarregados respondendo WhatsApp e uma agenda com poucas visitas realmente qualificadas.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Leads que somem depois do primeiro “oi”",
                "Equipe perdendo horas qualificando contato errado",
                "Custo por venda subindo a cada mês",
                "Falta de previsibilidade no faturamento",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-destructive" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Imobiliária média</div>
              <div className="mt-5 space-y-4">
                {[["Leads/mês","487"],["Qualificados","8%"],["Visitas reais","12"],["Vendas/mês","2"]].map(([l,v])=>(
                  <div key={l} className="flex items-end justify-between border-b border-border/60 pb-2 last:border-0">
                    <span className="text-xs text-muted-foreground">{l}</span>
                    <span className="text-xl font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border p-6 shadow-elevated text-primary-foreground" style={{ background: "var(--gradient-accent)" }}>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-primary-foreground/80">Com Imob Flow Lab</div>
              <div className="mt-5 space-y-4">
                {[["Leads/mês","820+"],["Qualificados","34%"],["Visitas reais","48"],["Vendas/mês","8-10"]].map(([l,v])=>(
                  <div key={l} className="flex items-end justify-between border-b border-primary-foreground/20 pb-2 last:border-0">
                    <span className="text-xs text-primary-foreground/80">{l}</span>
                    <span className="text-xl font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="metodo" className="bg-muted/40 border-y border-border">
        <div className="container-page py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Nosso método</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
              O Flow de aquisição com I.A. em 4 etapas
            </h2>
            <p className="mt-4 text-muted-foreground">
              Um sistema completo, instalado em até 14 dias, que une tráfego, qualificação por I.A. e agendamento automático com seus corretores.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard n="01" title="Captação inteligente" desc="Campanhas otimizadas no Meta e Google focadas em compradores reais por região, faixa de preço e perfil — não curiosos."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>} />
            <StepCard n="02" title="Qualificação por I.A." desc="Nossa I.A. conversa via WhatsApp 24/7, entende o momento de compra, valida renda e filtra apenas leads prontos."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} />
            <StepCard n="03" title="Agendamento automático" desc="Visitas e reuniões caem direto na agenda do corretor certo, com lembrete automático e confirmação."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>} />
            <StepCard n="04" title="Acompanhamento e CRM" desc="Follow-up automatizado, reengajamento de leads frios e dashboard em tempo real do ROI de cada campanha."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 4 5-5"/></svg>} />
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="provas" className="container-page py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Provas reais</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
            Imobiliárias que destravaram o crescimento
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Testimonial
            img={rafaelImg}
            name="Rafael Andrade"
            role="Diretor — Prime Imóveis"
            quote="Em 60 dias passamos de 3 para 9 vendas/mês. A I.A. faz o que 2 SDRs faziam, sem cansar e sem deixar lead na mão."
          />
          <Testimonial
            img={camilaImg}
            name="Camila Souza"
            role="Sócia — Alta Vista"
            quote="O nível de qualificação dos leads mudou tudo. Meus corretores só falam com quem realmente está pronto pra comprar."
          />
          <Testimonial
            img={marcosImg}
            name="Marcos Lima"
            role="CEO — Urbe Negócios"
            quote="Tinha medo de automatizar e perder o humano. Foi o contrário: a equipe ganhou tempo e fechou mais. ROI absurdo."
          />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl opacity-30" style={{ background: "var(--gradient-accent)" }} />
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Case Prime</div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">3 → 9 <span className="text-muted-foreground text-base font-normal">vendas/mês</span></div>
            <p className="mt-2 text-sm text-muted-foreground">em 60 dias após implementar o Flow</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl opacity-30" style={{ background: "var(--gradient-accent)" }} />
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Case Alta Vista</div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">R$ 4,2M <span className="text-muted-foreground text-base font-normal">em VGV</span></div>
            <p className="mt-2 text-sm text-muted-foreground">gerados no 1º trimestre</p>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full blur-2xl opacity-30" style={{ background: "var(--gradient-accent)" }} />
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Case Urbe</div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">-62% <span className="text-muted-foreground text-base font-normal">CAC</span></div>
            <p className="mt-2 text-sm text-muted-foreground">com mesmo investimento em ads</p>
          </div>
        </div>
      </section>

      {/* OFFER / WHO FOR */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: "var(--gradient-accent)" }} />
        <div className="container-page relative py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Para quem é a sessão estratégica
            </h2>
            <p className="mt-4 text-primary-foreground/80 leading-relaxed">
              Uma conversa de 30 minutos onde vamos mapear seu funil atual, identificar onde estão os gargalos e mostrar exatamente como aplicar I.A. para escalar suas vendas.
            </p>
            <ul className="mt-7 space-y-3 text-sm">
              {[
                "Imobiliárias com pelo menos 2 corretores ativos",
                "Que já investem (ou querem investir) em tráfego",
                "Que querem previsibilidade — não promessa mágica",
                "Decisores prontos para implementar em até 30 dias",
              ].map((i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-background text-foreground p-8 shadow-elevated">
            <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Você sai com</div>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3"><span className="text-success">✓</span> Diagnóstico do funil atual da sua imobiliária</li>
              <li className="flex gap-3"><span className="text-success">✓</span> Plano de implementação personalizado</li>
              <li className="flex gap-3"><span className="text-success">✓</span> Projeção realista de vendas em 90 dias</li>
              <li className="flex gap-3"><span className="text-success">✓</span> Recomendação de stack de I.A. ideal</li>
            </ul>
            <Link
              to="/agendar"
              className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
            >
              Quero agendar minha sessão →
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">100% gratuita • Sem compromisso</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-page py-24">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Dúvidas frequentes</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Perguntas comuns antes da sessão</h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <FAQ q="Em quanto tempo vejo resultado?" a="A maioria dos clientes percebe aumento de visitas qualificadas em 14-21 dias e impacto direto em vendas a partir do 2º mês." />
          <FAQ q="Preciso ter equipe de marketing?" a="Não. Cuidamos da implementação completa — tráfego, I.A., CRM e integração com seu time comercial." />
          <FAQ q="Funciona para imobiliárias pequenas?" a="Sim, desde que tenha pelo menos 2 corretores ativos e capacidade de atender o aumento de visitas." />
          <FAQ q="Vocês substituem meus corretores?" a="Não. A I.A. cuida da prospecção e qualificação. Seu corretor recebe leads quentes e fecha vendas." />
          <FAQ q="Qual o investimento?" a="Apresentamos a estrutura comercial na sessão estratégica, alinhada ao porte e meta da sua imobiliária." />
          <FAQ q="É contrato longo?" a="Trabalhamos com ciclos trimestrais para garantir ROI claro antes de qualquer renovação." />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-page pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16 text-center shadow-elevated hero-bg">
          <div className="absolute inset-0 grid-bg pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">
              Pronto para vender <span className="text-gradient">6 a 8 imóveis</span> a mais por mês?
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              Agende uma sessão estratégica gratuita e descubra exatamente o que muda no seu funil nos próximos 90 dias.
            </p>
            <Link
              to="/agendar"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground hover:opacity-90 transition shadow-elevated"
            >
              Agendar sessão estratégica →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
