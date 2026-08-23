/**
 * Lead form validation.
 *
 * Pure functions over a plain object, deliberately kept out of the component:
 * the rules are the part worth testing, and they are worth testing because a
 * form that silently rejects a valid Brazilian mobile number costs the agency a
 * real client.
 */

export const PROJECT_TYPES = [
  "Vídeo institucional",
  "Campanha",
  "Conteúdo recorrente",
  "Identidade visual",
  "Presença digital completa",
  "Ainda não sei",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface LeadDraft {
  readonly name: string;
  readonly company: string;
  readonly whatsapp: string;
  readonly email: string;
  readonly projectType: string;
  readonly message: string;
}

export type LeadField = keyof LeadDraft;

export type LeadErrors = Partial<Record<LeadField, string>>;

export const EMPTY_LEAD: LeadDraft = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  projectType: "",
  message: "",
};

/** Strips everything a person might type around the digits of a phone number. */
export const digitsOnly = (value: string): string => value.replace(/\D/g, "");

/**
 * Formats a Brazilian number as it is typed: (66) 99999-9999.
 *
 * Accepts both 10-digit landlines and 11-digit mobiles, and tolerates a leading
 * 55 country code by ignoring it for formatting purposes.
 */
export const formatWhatsapp = (value: string): string => {
  let digits = digitsOnly(value);
  if (digits.length > 11 && digits.startsWith("55")) digits = digits.slice(2);
  digits = digits.slice(0, 11);

  if (digits.length <= 2) return digits;
  const area = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length <= 4) return `(${area}) ${rest}`;
  const split = rest.length > 8 ? 5 : 4;
  return `(${area}) ${rest.slice(0, split)}-${rest.slice(split)}`;
};

/**
 * A pragmatic e-mail check: one @, something either side, a dot in the domain,
 * no whitespace. Deliberately not RFC 5322 - the only authority on whether an
 * address works is a message that arrives.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validateField = (field: LeadField, value: string): string | undefined => {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (!trimmed) return "Como podemos te chamar?";
      if (trimmed.length < 2) return "Nome muito curto.";
      return undefined;

    case "company":
      if (!trimmed) return "Conta pra gente o nome da empresa.";
      return undefined;

    case "whatsapp": {
      const digits = digitsOnly(trimmed).replace(/^55/, "");
      if (!digits) return "Precisamos de um WhatsApp para responder.";
      if (digits.length < 10 || digits.length > 11)
        return "Inclua DDD + número, com 10 ou 11 dígitos.";
      return undefined;
    }

    case "email":
      if (!trimmed) return "Precisamos de um e-mail.";
      if (!EMAIL.test(trimmed)) return "Esse e-mail parece incompleto.";
      return undefined;

    case "projectType":
      if (!trimmed) return "Escolha o tipo de projeto.";
      return undefined;

    case "message":
      if (!trimmed) return "Escreva uma linha sobre o projeto.";
      if (trimmed.length < 10) return "Conta um pouco mais — pelo menos uma frase.";
      return undefined;

    default:
      return undefined;
  }
};

export const validateLead = (draft: LeadDraft): LeadErrors => {
  const errors: LeadErrors = {};

  for (const field of Object.keys(draft) as LeadField[]) {
    const error = validateField(field, draft[field]);
    if (error) errors[field] = error;
  }

  return errors;
};

export const isValid = (errors: LeadErrors): boolean =>
  Object.keys(errors).length === 0;
