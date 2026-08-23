import { describe, expect, it } from "vitest";
import {
  additionalClients,
  cases,
  featuredCases,
  getCase,
  marqueeClients,
} from "./cases";
import { getService, services } from "./services";
import { heroChapters } from "./hero";
import { processSteps, team } from "./team";
import { footerNav, primaryNav, site, socials, yearsActive } from "./site";
import { CONFIRMAR, isPending } from "./types";
import { splitScriptWord } from "@/lib/splitScriptWord";

/**
 * These tests guard the two things that are easy to break silently in a content
 * layer: the invariants the components rely on (unique slugs, complete media,
 * a timeline that covers 0-1), and the promise that nothing commercial was
 * invented. The second is the one that matters most to this project.
 */

describe("hero timeline", () => {
  it("covers the full 0-1 range with no gaps", () => {
    expect(heroChapters[0]?.start).toBe(0);
    expect(heroChapters[heroChapters.length - 1]?.end).toBe(1);

    heroChapters.forEach((chapter, index) => {
      if (index === 0) return;
      expect(chapter.start).toBe(heroChapters[index - 1]?.end);
    });
  });

  it("keeps every chapter forward-going and in range", () => {
    for (const chapter of heroChapters) {
      expect(chapter.end).toBeGreaterThan(chapter.start);
      expect(chapter.start).toBeGreaterThanOrEqual(0);
      expect(chapter.end).toBeLessThanOrEqual(1);
    }
  });

  it("keeps the copy short enough to read while scrolling", () => {
    for (const chapter of heroChapters) {
      expect(chapter.line.length).toBeLessThanOrEqual(48);
    }
  });

  it("ends on a silent beat so the next section can take the screen", () => {
    const last = heroChapters[heroChapters.length - 1];
    expect(last?.line).toBe("");
  });
});

describe("services", () => {
  it("has unique slugs and sequential indexes", () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    services.forEach((service, index) => {
      expect(service.index).toBe(String(index + 1).padStart(2, "0"));
    });
  });

  it("is resolvable by slug", () => {
    for (const service of services) {
      expect(getService(service.slug)).toBe(service);
    }
    expect(getService("nao-existe")).toBeUndefined();
  });

  it("gives every service media with real dimensions and alt text", () => {
    for (const service of services) {
      expect(service.media.alt.length).toBeGreaterThan(8);
      expect(service.media.width).toBeGreaterThan(0);
      expect(service.media.height).toBeGreaterThan(0);
    }
  });

  it("puts every script word at the end of its title", () => {
    // The headline is rebuilt as `head + script`, so a phrase that is not a
    // suffix would reorder the sentence on screen.
    for (const service of services) {
      if (!service.scriptWord) continue;
      expect(service.title.endsWith(service.scriptWord)).toBe(true);
      expect(splitScriptWord(service.title, service.scriptWord).script).toBe(
        service.scriptWord,
      );
    }
  });
});

describe("cases", () => {
  it("has unique slugs", () => {
    const slugs = cases.map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("is resolvable by slug", () => {
    for (const entry of cases) {
      expect(getCase(entry.slug)).toBe(entry);
    }
    expect(getCase("cliente-inventado")).toBeUndefined();
  });

  it("features a subset of the real cases", () => {
    expect(featuredCases.length).toBeGreaterThan(0);
    expect(featuredCases.length).toBeLessThanOrEqual(cases.length);
    for (const entry of featuredCases) expect(cases).toContain(entry);
  });

  it("never states a result or a year that the agency has not confirmed", () => {
    for (const entry of cases) {
      // If these ever stop being CONFIRMAR, a human put a real number there on
      // purpose - which is exactly the review this test is meant to force.
      expect(isPending(entry.outcome) || entry.outcome.length > 0).toBe(true);
      expect(isPending(entry.year) || /^\d{4}$/.test(entry.year)).toBe(true);
    }
  });

  it("keeps unconfirmed clients as bare names, with no invented detail", () => {
    for (const client of additionalClients) {
      expect(client.trim().length).toBeGreaterThan(0);
      expect(client).not.toContain(CONFIRMAR);
    }
  });

  it("builds the marquee only from confirmed client names", () => {
    const confirmedNames = new Set([
      ...cases.map((entry) => entry.client),
      ...additionalClients,
    ]);

    expect(marqueeClients.length).toBeGreaterThanOrEqual(8);
    expect(new Set(marqueeClients).size).toBe(marqueeClients.length);
    for (const client of marqueeClients) expect(confirmedNames.has(client)).toBe(true);
  });

  it("points every Instagram link at a real profile URL", () => {
    for (const entry of cases) {
      if (!entry.instagram) continue;
      expect(entry.instagram).toMatch(/^https:\/\/(www\.)?instagram\.com\/[\w.]+\/?$/);
    }
  });
});

describe("team", () => {
  it("lists no duplicate people", () => {
    const names = team.map((member) => member.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("gives everyone a role and a photograph", () => {
    for (const member of team) {
      expect(member.role.trim().length).toBeGreaterThan(0);
      expect(member.photo).toMatch(/^\/media\/team\/.+\.(jpg|webp|png)$/);
    }
  });

  it("keeps the process to the four published steps, in order", () => {
    expect(processSteps).toHaveLength(4);
    processSteps.forEach((step, index) => {
      expect(step.index).toBe(String(index + 1).padStart(2, "0"));
    });
  });
});

describe("site", () => {
  it("derives the years in operation instead of hard-coding them", () => {
    // Local dates: `new Date("2030-01-01")` is UTC midnight, which is still
    // 2029 in Brazil.
    expect(yearsActive(new Date(2026, 7, 22))).toBe(2026 - site.foundedYear);
    expect(yearsActive(new Date(2030, 0, 1))).toBe(2030 - site.foundedYear);
  });

  it("uses only https social links on the agency's own profiles", () => {
    for (const social of socials) {
      expect(social.href).toMatch(/^https:\/\//);
      expect(social.href).toContain("fullagencia");
    }
  });

  it("keeps every navigation target internal and absolute", () => {
    for (const item of [...primaryNav, ...footerNav]) {
      expect(item.href.startsWith("/")).toBe(true);
    }
  });

  it("includes every primary nav entry in the footer", () => {
    for (const item of primaryNav) {
      expect(footerNav.map((entry) => entry.href)).toContain(item.href);
    }
  });
});
