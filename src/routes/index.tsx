import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import logoAsset from "@/assets/imob-flow-lab-logo.jpg.asset.json";

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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="text-3xl md:text-4xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function StepCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-7 shadow-soft">
      <div className="absolute -top-3 left-7 inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-xs font-semibold text-primary-foreground">
        {n}
      </div>
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function Testimonial({ name, role, quote }: { name: string; role: string; quote: string }) {
  return (
    <figure className="rounded-2xl border border-border bg-card p-7 shadow-soft">
      <blockquote className="text-sm leading-relaxed text-foreground">
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-muted grid place-items-center text-xs font-semibold">
          {name.split(" ").map(w => w[0]).slice(0,2).join("")}
        </div>
        <div className="text-xs">
          <div className="font-medium">{name}</div>
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

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="hero-bg">
        <div className="container-page pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Para imobiliárias que querem escalar com previsibilidade
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Venda <span className="underline decoration-accent decoration-[6px] underline-offset-4">6 a 8 imóveis a mais</span> por mês com Inteligência Artificial
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Construímos um sistema completo de aquisição com I.A. que prospecta, qualifica e agenda visitas com compradores reais — sem depender só de portais ou indicação.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/agendar"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition shadow-elevated"
              >
                Agendar sessão estratégica gratuita →
              </Link>
              <a href="#metodo" className="text-sm text-muted-foreground hover:text-foreground">
                Ver como funciona
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Vagas limitadas • Conversa de 30 min com nosso time
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="+6-8" label="imóveis/mês adicionais" />
            <Stat value="3x" label="mais visitas qualificadas" />
            <Stat value="-62%" label="custo por lead" />
            <Stat value="24/7" label="atendimento por I.A." />
          </div>
        </div>
      </section>

      {/* LOGOS / SOCIAL */}
      <section className="border-y border-border bg-muted/40">
        <div className="container-page py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>Imobiliárias parceiras</span>
          <span className="font-semibold text-foreground/70">PRIME IMÓVEIS</span>
          <span className="font-semibold text-foreground/70">ALTA VISTA</span>
          <span className="font-semibold text-foreground/70">URBE NEGÓCIOS</span>
          <span className="font-semibold text-foreground/70">CASA & CIA</span>
          <span className="font-semibold text-foreground/70">NEXT LAR</span>
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
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elevated">
            <div className="text-sm font-medium text-muted-foreground">Imobiliária média</div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-muted p-4">
                <div className="text-2xl font-semibold">487</div>
                <div className="text-xs text-muted-foreground">leads/mês</div>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <div className="text-2xl font-semibold">8%</div>
                <div className="text-xs text-muted-foreground">qualificados</div>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <div className="text-2xl font-semibold">12</div>
                <div className="text-xs text-muted-foreground">visitas reais</div>
              </div>
              <div className="rounded-xl bg-muted p-4">
                <div className="text-2xl font-semibold">2</div>
                <div className="text-xs text-muted-foreground">vendas/mês</div>
              </div>
            </div>
            <div className="my-6 h-px bg-border" />
            <div className="text-sm font-medium text-foreground">Com Imob Flow Lab</div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-accent/30 p-4">
                <div className="text-2xl font-semibold">820+</div>
                <div className="text-xs text-muted-foreground">leads/mês</div>
              </div>
              <div className="rounded-xl bg-accent/30 p-4">
                <div className="text-2xl font-semibold">34%</div>
                <div className="text-xs text-muted-foreground">qualificados pela I.A.</div>
              </div>
              <div className="rounded-xl bg-accent/30 p-4">
                <div className="text-2xl font-semibold">48</div>
                <div className="text-xs text-muted-foreground">visitas reais</div>
              </div>
              <div className="rounded-xl bg-accent/30 p-4">
                <div className="text-2xl font-semibold">8-10</div>
                <div className="text-xs text-muted-foreground">vendas/mês</div>
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
            <StepCard n="01" title="Captação inteligente" desc="Campanhas otimizadas no Meta e Google focadas em compradores reais por região, faixa de preço e perfil — não curiosos." />
            <StepCard n="02" title="Qualificação por I.A." desc="Nossa I.A. conversa via WhatsApp 24/7, entende o momento de compra, valida renda e filtra apenas leads prontos." />
            <StepCard n="03" title="Agendamento automático" desc="Visitas e reuniões caem direto na agenda do corretor certo, com lembrete automático e confirmação." />
            <StepCard n="04" title="Acompanhamento e CRM" desc="Follow-up automatizado, reengajamento de leads frios e dashboard em tempo real do ROI de cada campanha." />
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
            name="Rafael Andrade"
            role="Diretor — Prime Imóveis"
            quote="Em 60 dias passamos de 3 para 9 vendas/mês. A I.A. faz o que 2 SDRs faziam, sem cansar e sem deixar lead na mão."
          />
          <Testimonial
            name="Camila Souza"
            role="Sócia — Alta Vista"
            quote="O nível de qualificação dos leads mudou tudo. Meus corretores só falam com quem realmente está pronto pra comprar."
          />
          <Testimonial
            name="Marcos Lima"
            role="CEO — Urbe Negócios"
            quote="Tinha medo de automatizar e perder o humano. Foi o contrário: a equipe ganhou tempo e fechou mais. ROI absurdo."
          />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Case Prime</div>
            <div className="mt-3 text-2xl font-semibold">3 → 9 vendas/mês</div>
            <p className="mt-2 text-sm text-muted-foreground">em 60 dias após implementar o Flow</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Case Alta Vista</div>
            <div className="mt-3 text-2xl font-semibold">R$ 4,2M em VGV</div>
            <p className="mt-2 text-sm text-muted-foreground">gerados no 1º trimestre</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Case Urbe</div>
            <div className="mt-3 text-2xl font-semibold">-62% CAC</div>
            <p className="mt-2 text-sm text-muted-foreground">com mesmo investimento em ads</p>
          </div>
        </div>
      </section>

      {/* OFFER / WHO FOR */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-24 grid md:grid-cols-2 gap-12 items-center">
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
        <div className="rounded-3xl border border-border bg-card p-10 md:p-16 text-center shadow-elevated hero-bg">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto">
            Pronto para vender 6 a 8 imóveis a mais por mês?
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
      </section>

      <SiteFooter />
    </div>
  );
}
