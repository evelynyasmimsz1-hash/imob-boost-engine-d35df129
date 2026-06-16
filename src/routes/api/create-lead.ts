import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(8).max(20),
  answers: z
    .object({
      role: z.string().max(200).optional().default(""),
      goal: z.string().max(200).optional().default(""),
      callCenter: z.string().max(200).optional().default(""),
      brokers: z.string().max(200).optional().default(""),
    })
    .default({ role: "", goal: "", callCenter: "", brokers: "" }),
  utm_source: z.string().max(500).optional().default(""),
  utm_campaign: z.string().max(500).optional().default(""),
  utm_content: z.string().max(500).optional().default(""),
  fbclid: z.string().max(500).optional().default(""),
  page_url: z.string().max(1000).optional().default(""),
});

export const Route = createFileRoute("/api/create-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env.GHL_PRIVATE_TOKEN;
        const locationId = process.env.GHL_LOCATION_ID;
        if (!token || !locationId) {
          return Response.json(
            { ok: false, error: "GHL credentials not configured" },
            { status: 500 }
          );
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json(
            { ok: false, error: "Invalid JSON" },
            { status: 400 }
          );
        }

        const parsed = leadSchema.safeParse(payload);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Invalid input", issues: parsed.error.issues },
            { status: 400 }
          );
        }
        const data = parsed.data;

        const firstName = data.name.trim();

        const customFields: { key: string; field_value: string }[] = [
          {
            key: "contact.qual_a_sua_funo_na_empresa",
            field_value: data.answers.role,
          },
          {
            key: "contact.o_que_voc_tem_de_meta_para_atingir_esse_ano",
            field_value: data.answers.goal,
          },
          {
            key: "contact.sua_empresa_tem_um_call_center_ou_vendedor_para_os_agendamentos",
            field_value: data.answers.callCenter,
          },
          {
            key: "contact.quantos_corretores_voc_tem",
            field_value: data.answers.brokers,
          },
        ].filter((f) => f.field_value);

        const body = {
          locationId,
          firstName,
          name: data.name,
          email: data.email,
          phone: data.phone,
          source: "Site Lovable",
          tags: ["Lead - Site", "Imob Flow Lab"],
          customFields,
          attributionSource: {
            utmSource: data.utm_source || undefined,
            utmCampaign: data.utm_campaign || undefined,
            utmContent: data.utm_content || undefined,
            fbclid: data.fbclid || undefined,
            url: data.page_url || undefined,
          },
        };

        const res = await fetch(
          "https://services.leadconnectorhq.com/contacts/upsert",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Version: "2021-07-28",
              Accept: "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        const text = await res.text();
        if (!res.ok) {
          console.error("GHL upsert contact failed", res.status, text);
          return Response.json(
            { ok: false, error: "Failed to create lead", status: res.status },
            { status: 502 }
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});
