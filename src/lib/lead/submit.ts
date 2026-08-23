import type { LeadDraft } from "./schema";

/**
 * ============================================================================
 * INTEGRATION SEAM - NOT A REAL SUBMISSION
 * ============================================================================
 *
 * The FULL team has not confirmed a destination for form submissions: no
 * endpoint, no inbox, no CRM, no WhatsApp Business number. Rather than wire the
 * form to something invented, or fake a success state that would quietly lose
 * real enquiries, this module does exactly one honest thing: it validates the
 * shape, records the lead locally, and reports that the message was *prepared*,
 * not delivered.
 *
 * The UI reflects that distinction in its wording, and every lead is echoed to
 * the console so nothing is lost during review.
 *
 * To connect it for real, replace the body of `submitLead` with a POST to the
 * agreed endpoint and update `docs/architecture.md`. Everything else - the
 * validation, the states, the accessibility wiring - stays as it is.
 *
 * @see docs/content-confirmation.md
 */

export type SubmitOutcome =
  | { readonly status: "prepared"; readonly reference: string }
  | { readonly status: "failed"; readonly reason: string };

/** Whether a real backend has been configured. Drives the UI's wording. */
export const HAS_BACKEND = Boolean(process.env.NEXT_PUBLIC_LEAD_ENDPOINT);

const reference = (): string =>
  `FULL-${Date.now().toString(36).toUpperCase().slice(-6)}`;

export const submitLead = async (draft: LeadDraft): Promise<SubmitOutcome> => {
  const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

  if (!endpoint) {
    // Demonstration path. Nothing leaves the browser.
    if (process.env.NODE_ENV !== "production") {
      console.info("[FULL] Lead preparado (nenhum backend configurado):", draft);
    }
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { status: "prepared", reference: reference() };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      return { status: "failed", reason: `Servidor respondeu ${response.status}.` };
    }

    return { status: "prepared", reference: reference() };
  } catch {
    return {
      status: "failed",
      reason: "Não conseguimos enviar agora. Tente de novo em instantes.",
    };
  }
};
