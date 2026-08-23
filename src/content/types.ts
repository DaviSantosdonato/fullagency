/**
 * Content model.
 *
 * Every field on this site comes from one of these files, never from JSX. That
 * keeps the copy auditable — `grep CONFIRMAR src/content` lists everything the
 * agency still has to sign off on — and leaves a clean seam for a CMS later:
 * swap the module bodies for fetches, keep the types.
 */

/**
 * Marks a value the FULL team has not confirmed yet. It renders visibly in
 * development and is stripped from production output by the components that
 * read it, so a placeholder can never quietly ship as a factual claim.
 *
 * @see docs/content-confirmation.md
 */
export const CONFIRMAR = "[CONFIRMAR]" as const;
export type Confirmar = typeof CONFIRMAR;

/** A value that is either confirmed content or an explicit open question. */
export type Pending<T> = T | Confirmar;

export const isPending = <T,>(value: Pending<T>): value is Confirmar =>
  value === CONFIRMAR;

export type MediaKind = "image" | "video";

export interface MediaAsset {
  readonly kind: MediaKind;
  readonly src: string;
  /** Poster frame. Required for video so nothing ever renders as a black box. */
  readonly poster?: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly handle: string;
}

export interface Service {
  readonly slug: string;
  /** Two-digit chapter number rendered as an editorial marker. */
  readonly index: string;
  readonly title: string;
  /** The word inside `title` rendered in the script face, if any. */
  readonly scriptWord?: string;
  readonly lead: string;
  readonly body: string;
  readonly deliverables: readonly string[];
  readonly media: MediaAsset;
}

export interface CaseStudy {
  readonly slug: string;
  readonly client: string;
  readonly sector: string;
  readonly summary: string;
  readonly year: Pending<string>;
  readonly scope: readonly string[];
  readonly instagram?: string;
  readonly cover: MediaAsset;
  /** Long-form narrative. Kept short until the agency supplies the real story. */
  readonly narrative: readonly string[];
  readonly outcome: Pending<string>;
}

export interface TeamMember {
  readonly name: string;
  readonly role: string;
  readonly photo: string;
}

export interface ProcessStep {
  readonly index: string;
  readonly verb: string;
  readonly title: string;
  readonly body: string;
}

export interface HeroChapter {
  /** Normalised scroll/timeline position where the chapter starts (0–1). */
  readonly start: number;
  /** Normalised position where it ends (0–1). */
  readonly end: number;
  readonly kicker: string;
  readonly line: string;
  /** Rendered in the script face, appended after `line`. */
  readonly scriptWord?: string;
}
