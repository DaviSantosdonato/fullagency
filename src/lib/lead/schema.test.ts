import { describe, expect, it } from "vitest";
import {
  EMPTY_LEAD,
  formatWhatsapp,
  isValid,
  validateField,
  validateLead,
  type LeadDraft,
} from "./schema";

const filled: LeadDraft = {
  name: "Vitor",
  company: "Rodobras",
  whatsapp: "(66) 99999-8888",
  email: "contato@rodobras.com.br",
  projectType: "Campanha",
  message: "Precisamos refazer o institucional da rede.",
};

describe("formatWhatsapp", () => {
  it("formats an 11-digit mobile as it is typed", () => {
    expect(formatWhatsapp("6")).toBe("6");
    expect(formatWhatsapp("66")).toBe("66");
    expect(formatWhatsapp("6699")).toBe("(66) 99");
    expect(formatWhatsapp("66999998888")).toBe("(66) 99999-8888");
  });

  it("formats a 10-digit landline with the shorter split", () => {
    expect(formatWhatsapp("6633334444")).toBe("(66) 3333-4444");
  });

  it("drops a leading country code rather than mangling the number", () => {
    expect(formatWhatsapp("5566999998888")).toBe("(66) 99999-8888");
  });

  it("ignores punctuation the visitor pastes in", () => {
    expect(formatWhatsapp("+55 (66) 99999-8888")).toBe("(66) 99999-8888");
  });

  it("never grows past a full number", () => {
    expect(formatWhatsapp("669999988889999")).toBe("(66) 99999-8888");
  });
});

describe("validateField", () => {
  it("accepts a real Brazilian mobile", () => {
    expect(validateField("whatsapp", "(66) 99999-8888")).toBeUndefined();
  });

  it("accepts a 10-digit landline", () => {
    expect(validateField("whatsapp", "(66) 3333-4444")).toBeUndefined();
  });

  it("rejects a number that is too short to dial", () => {
    expect(validateField("whatsapp", "(66) 999")).toBeDefined();
  });

  it("accepts a number written with the country code", () => {
    expect(validateField("whatsapp", "+55 66 99999-8888")).toBeUndefined();
  });

  it.each([
    ["contato@fullagencia.com.br", undefined],
    ["nome.sobrenome+tag@sub.dominio.com", undefined],
    ["sem-arroba.com", "invalid"],
    ["dois@@arrobas.com", "invalid"],
    ["sem@dominio", "invalid"],
    ["com espaco@dominio.com", "invalid"],
  ])("validates the e-mail %s", (email, expectation) => {
    const result = validateField("email", email);
    if (expectation === undefined) expect(result).toBeUndefined();
    else expect(result).toBeDefined();
  });

  it("treats whitespace-only input as empty", () => {
    expect(validateField("name", "   ")).toBeDefined();
    expect(validateField("message", "   ")).toBeDefined();
  });

  it("asks for more than a single word in the message", () => {
    expect(validateField("message", "oi")).toBeDefined();
    expect(validateField("message", "Quero um vídeo institucional.")).toBeUndefined();
  });
});

describe("validateLead", () => {
  it("reports every empty field on a blank form", () => {
    const errors = validateLead(EMPTY_LEAD);
    expect(Object.keys(errors).sort()).toEqual(
      ["company", "email", "message", "name", "projectType", "whatsapp"].sort(),
    );
    expect(isValid(errors)).toBe(false);
  });

  it("passes a completed form", () => {
    expect(isValid(validateLead(filled))).toBe(true);
  });

  it("fails the whole form when a single field is wrong", () => {
    const errors = validateLead({ ...filled, email: "quebrado@" });
    expect(isValid(errors)).toBe(false);
    expect(Object.keys(errors)).toEqual(["email"]);
  });
});
