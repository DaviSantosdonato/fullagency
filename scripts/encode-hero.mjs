/**
 * Hero video encoder.
 *
 * The hero is scrubbed by scroll position, which means the browser must be able
 * to seek to an arbitrary `currentTime` and decode a frame *immediately*. Two
 * things make that possible:
 *
 *   1. A dense keyframe interval (`-g 6` at 24fps => a keyframe every 0.25s).
 *      Seeking only ever has to decode a handful of inter-frames.
 *   2. `+faststart`, which moves the moov atom to the front so playback and
 *      seeking can begin before the whole file has arrived.
 *
 * Audio is stripped: the hero is always muted, so the AAC track is dead weight
 * and it delays the `canplay` event on some browsers.
 *
 * Usage:  node scripts/encode-hero.mjs <source.mp4>
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "media", "hero");
const source = process.argv[2];

if (!source || !existsSync(source)) {
  console.error("Usage: node scripts/encode-hero.mjs <source-video>");
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

const run = (args) => {
  console.log(`ffmpeg ${args.join(" ")}`);
  execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
};

const SCRUB_FLAGS = [
  "-c:v", "libx264",
  "-profile:v", "high",
  "-pix_fmt", "yuv420p",
  "-preset", "slow",
  "-g", "6",            // keyframe every 0.25s at 24fps
  "-keyint_min", "6",
  "-sc_threshold", "0", // no scene-cut keyframes: keep the GOP grid uniform
  "-movflags", "+faststart",
  "-an",                // hero is always muted
];

// Masters may arrive at 24, 30 or 60 fps. Normalize before applying the
// six-frame GOP above so every output keeps the intended 250 ms seek interval
// and mobile devices do not decode frames the scroll interaction never shows.
const DESKTOP_FILTER = "fps=24,scale=1280:-2";
const MOBILE_FILTER = "fps=24,scale=640:-2";

// Desktop: 1280x720
run([...["-i", source], ...SCRUB_FLAGS, "-crf", "21",
     "-vf", DESKTOP_FILTER, path.join(OUT_DIR, "full-camera-flow.mp4")]);

// Mobile: half resolution, cheaper to decode while scrubbing on a weak GPU.
run([...["-i", source], ...SCRUB_FLAGS, "-crf", "26",
     "-vf", MOBILE_FILTER, path.join(OUT_DIR, "full-camera-flow-mobile.mp4")]);

// WebM/VP9 alternative. `-g 6` matters here for the same reason.
run([...["-i", source],
     "-c:v", "libvpx-vp9", "-crf", "34", "-b:v", "0",
     "-g", "6", "-keyint_min", "6",
     "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
     "-pix_fmt", "yuv420p", "-an",
     "-vf", DESKTOP_FILTER, path.join(OUT_DIR, "full-camera-flow.webm")]);

// Poster: first frame, shown until the video reports it can render.
run(["-i", source, "-frames:v", "1", "-vf", "scale=1280:-2",
     "-quality", "82", path.join(OUT_DIR, "full-camera-poster.webp")]);
run(["-i", source, "-frames:v", "1", "-vf", "scale=1280:-2",
     "-q:v", "4", path.join(OUT_DIR, "full-camera-poster.jpg")]);

console.log("\nHero encoded ->", OUT_DIR);
