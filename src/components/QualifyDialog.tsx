import { useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

type Answers = {
  role: string;
  goal: string;
  callCenter: string;
  brokers: string;
  name: string;
  phone: string;
  email: string;
};

const initial: Answers = {
  role: "",
  goal: "",
  callCenter: "",
  brokers: "",
  name: "",
  phone: "",
  email: "",
};

const steps: {
  key: keyof Answers;
  title: string;
  options: string[];
}[] = [
  {
    key: "role",
    title: "Qual a sua função na empresa?",
    options: ["Dono/CEO", "Diretor de Vendas", "Corretor", "Outro"],
  },
  {
    key: "goal",
    title: "O que você tem de meta para atingir esse ano?",
    options: [
      "0 - R$1M por ano",
      "R$1M a R$2M por ano",
      "R$2M a R$5M por ano",
      "R$5M a R$10M por ano",
      "R$10M+ por ano",
    ],
  },
  {
    key: "callCenter",
    title: "Sua empresa tem um call center ou vendedor para os agendamentos?",
    options: ["Sim", "Não, eu mesmo ligarei para os leads"],
  },
  {
    key: "brokers",
    title: "Quantos corretores você tem?",
    options: [
      "Apenas eu",
      "1 a 3 Corretores",
      "3 a 8 Corretores",
      "9 a 15 Corretores",
      "+ de 15 Corretores",
    ],
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  phone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(20, "Telefone inválido")
    .regex(/^[+()0-9\s-]+$/, "Telefone inválido"),
  email: z.string().trim().email("Email inválido").max(255),
});

export function QualifyCta({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const totalSteps = steps.length + 1;
  const isContactStep = step === steps.length;

  function reset() {
    setStep(0);
    setAnswers(initial);
    setErrors({});
  }

  function handlePick(key: keyof Answers, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 120);
  }

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const parsed = contactSchema.safeParse({
      name: answers.name,
      phone: answers.phone,
      email: answers.email,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0] as string] = issue.message;
      }
      setErrors(errs);
      return;
    }

    let utm_source = "";
    let utm_campaign = "";
    let utm_content = "";
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      utm_source = sp.get("utm_source") ?? "";
      utm_campaign = sp.get("utm_campaign") ?? "";
      utm_content = sp.get("utm_content") ?? "";
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          answers: {
            role: answers.role,
            goal: answers.goal,
            callCenter: answers.callCenter,
            brokers: answers.brokers,
          },
          utm_source,
          utm_campaign,
          utm_content,
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body?.error ?? "Erro ao enviar");
      }

      try {
        sessionStorage.setItem(
          "imobflowlab:lead",
          JSON.stringify({ ...answers, ...parsed.data, at: Date.now() })
        );
      } catch {
        /* ignore */
      }

      try {
        const w = window as unknown as { fbq?: (...args: unknown[]) => void };
        w.fbq?.("track", "Lead");
      } catch {
        /* ignore */
      }

      setOpen(false);
      navigate({ to: "/agendar" });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Erro ao enviar. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setTimeout(reset, 200);
      }}
    >
      <DialogTrigger asChild>
        <button type="button" className={className}>
          {children}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <div className="h-1.5 w-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <div className="p-6 md:p-8">
          <DialogHeader className="space-y-2 text-left">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Etapa {step + 1} de {totalSteps}
            </div>
            <DialogTitle className="text-xl md:text-2xl font-semibold tracking-tight">
              {isContactStep
                ? "Preencha suas informações para agendar a call"
                : steps[step].title}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {isContactStep
                ? "Usaremos esses dados para confirmar sua sessão estratégica."
                : "Selecione a opção que melhor descreve seu cenário atual."}
            </DialogDescription>
          </DialogHeader>

          {!isContactStep ? (
            <div className="mt-6 space-y-2">
              {steps[step].options.map((opt) => {
                const active = answers[steps[step].key] === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handlePick(steps[step].key, opt)}
                    className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition shadow-soft hover:border-foreground hover:bg-muted/60 ${
                      active
                        ? "border-foreground bg-muted"
                        : "border-border bg-card"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="mt-3 text-xs text-muted-foreground hover:text-foreground"
                >
                  ← Voltar
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={answers.name}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, name: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                  placeholder="Seu nome completo"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  maxLength={20}
                  value={answers.phone}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, phone: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                  placeholder="(11) 90000-0000"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={answers.email}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, email: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
                  placeholder="voce@imobiliaria.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
              {submitError && (
                <p className="text-xs text-destructive">{submitError}</p>
              )}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={submitting}
                  className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  ← Voltar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition shadow-elevated disabled:opacity-60"
                >
                  {submitting ? "Enviando..." : "Agendar minha call →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
