import type { HeroChapter } from "./types";

/**
 * The hero's five beats.
 *
 * Positions are **normalised** (0–1), not seconds. The storyboard was written
 * against a 30s cut (0–5 / 5–13 / 13–23 / 23–27 / 27–30) and those ratios are
 * what survive here, so the same chapters land correctly whatever the real
 * `video.duration` turns out to be — the current cut is 15.17s.
 *
 * @see docs/storyboard.md
 */
export const heroChapters: readonly HeroChapter[] = [
  {
    start: 0,
    end: 0.167,
    kicker: "01 — Ideia",
    line: "Toda marca começa com uma",
    scriptWord: "ideia",
  },
  {
    start: 0.167,
    end: 0.433,
    kicker: "02 — Lente",
    line: "A gente coloca em",
    scriptWord: "foco",
  },
  {
    start: 0.433,
    end: 0.767,
    kicker: "03 — Time",
    line: "Estratégia, criação e produção",
    scriptWord: "no mesmo time",
  },
  {
    start: 0.767,
    end: 0.9,
    kicker: "04 — Casa",
    line: "Tudo acontece",
    scriptWord: "dentro de casa",
  },
  {
    // The exit beat carries no copy: the frame empties and the next section
    // takes the screen.
    start: 0.9,
    end: 1,
    kicker: "",
    line: "",
  },
];

export const heroMedia = {
  mp4: "/media/hero/full-camera-flow.mp4",
  mp4Mobile: "/media/hero/full-camera-flow-mobile.mp4",
  webm: "/media/hero/full-camera-flow.webm",
  poster: "/media/hero/full-camera-poster.webp",
  posterFallback: "/media/hero/full-camera-poster.jpg",
} as const;
