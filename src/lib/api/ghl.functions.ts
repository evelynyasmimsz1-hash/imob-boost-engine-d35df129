import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(8).max(20),
  answers: z.object({
    role: z.string().max(100).optional().default(""),
    goal: z.string().max(100).optional().default(""),
    callCenter: z.string().max(100).optional().default(""),
    brokers: z.string().max(100).optional().default(""),
  }),
  utm_source: z.string().max(200).optional().default(""),
  utm_campaign: z.string().max(200).optional().default(""),
  utm_content: z.string().max(200).optional().default(""),
});

export const createLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env.GHL_PRIVATE_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;
    if (!token || !locationId) {
      throw new Error("GHL credentials not configured");
    }

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

    if (!res.ok) {
      const text = await res.text();
      console.error("GHL create contact failed", res.status, text);
      // If contact already exists, GHL returns 400 with duplicate info — treat as success
      if (res.status === 400 && text.toLowerCase().includes("duplicat")) {
        return { ok: true, duplicate: true };
      }
      throw new Error(`Failed to create lead (${res.status})`);
    }

    return { ok: true };
  });
