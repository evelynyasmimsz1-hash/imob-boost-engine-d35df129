import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(8).max(20),
  answers: z
    .object({
      role: z.string().max(100).optional().default(""),
      goal: z.string().max(100).optional().default(""),
      callCenter: z.string().max(100).optional().default(""),
      brokers: z.string().max(100).optional().default(""),
    })
    .default({ role: "", goal: "", callCenter: "", brokers: "" }),
  utm_source: z.string().max(200).optional().default(""),
  utm_campaign: z.string().max(200).optional().default(""),
  utm_content: z.string().max(200).optional().default(""),
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

        const nameParts = data.name.trim().split(/\s+/);
        const firstName = nameParts.shift() ?? data.name;
        const lastName = nameParts.join(" ");

        const body = {
          firstName,
          lastName,
          name: data.name,
          email: data.email,
          phone: data.phone,
          locationId,
          source: "Site Lovable",
          tags: ["Lead - Site", "Imob Flow Lab"],
          customFields: [
            { key: "role", field_value: data.answers.role },
            { key: "goal", field_value: data.answers.goal },
            { key: "call_center", field_value: data.answers.callCenter },
            { key: "brokers", field_value: data.answers.brokers },
            { key: "utm_source", field_value: data.utm_source },
            { key: "utm_campaign", field_value: data.utm_campaign },
            { key: "utm_content", field_value: data.utm_content },
          ],
          attributionSource: {
            utmSource: data.utm_source || undefined,
            utmCampaign: data.utm_campaign || undefined,
            utmContent: data.utm_content || undefined,
          },
        };

        const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        });

        const text = await res.text();
        if (!res.ok) {
          console.error("GHL create contact failed", res.status, text);
          if (res.status === 400 && text.toLowerCase().includes("duplicat")) {
            return Response.json({ ok: true, duplicate: true });
          }
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
