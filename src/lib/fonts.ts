import { Shrikhand, Space_Mono } from "next/font/google";

/**
 * Two personalities, loaded once.
 *
 * Space Mono carries everything structural. Shrikhand appears only on single words, so
 * it is loaded at 400 with `display: swap` — a late swap on one word is
 * invisible, whereas blocking on it would hold the whole hero.
 */
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const shrikhand = Shrikhand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-shrikhand",
  weight: "400",
});
