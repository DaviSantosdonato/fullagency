"use client";

import { useEffect, useRef } from "react";
import { HeroChapterPanel } from "./HeroChapter";
import { heroChapters, heroMedia } from "@/content/hero";
import { site } from "@/content/site";
import { useDeviceProfile } from "@/lib/useDeviceProfile";
import { useScrollVideo } from "@/lib/useScrollVideo";
import { gsap } from "@/lib/gsap";

/**
 * Maps a value from one range to another and clamps it to 0-1.
 * Turns global timeline progress into a chapter's own local progress.
 */
const localProgress = (value: number, start: number, end: number): number => {
  if (end <= start) return 0;
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
};

/**
 * Trapezoidal envelope: fade in, hold, fade out. `edge` is the fraction of the
 * chapter spent on each ramp.
 *
 * `fadeIn` is off for the opening chapter. Ramping it up from zero would mean
 * the first thing on screen, before any scrolling, is an empty black frame -
 * indistinguishable from a page that failed to load.
 */
const envelope = (local: number, edge = 0.22, fadeIn = true): number => {
  if (local >= 1) return 0;
  if (local <= 0) return fadeIn ? 0 : 1;
  if (fadeIn && local < edge) return local / edge;
  if (local > 1 - edge) return (1 - local) / edge;
  return 1;
};

/**
 * The opening: a cinema camera assembled and dismissed by the scroll wheel.
 *
 * Two things are worth knowing before editing this file.
 *
 * The stage is CSS `position: sticky`, not a GSAP pin. ScrollTrigger only
 * reports progress. Sticky positioning releases by itself at the end of the
 * section, injects no spacer element, and cannot leave the page stuck if a
 * refresh is missed - the three ways a pinned hero traps a visitor.
 *
 * Nothing here re-renders React. Progress arrives through a subscription and is
 * written to the DOM with cached `gsap.quickSetter`s, so a 144Hz scroll costs
 * zero reconciliations.
 */
export const CinematicScrollHero = () => {
  const scopeRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, lowPower, narrow, resolved } = useDeviceProfile();

  // Phones use a dedicated 640px, densely-keyframed MP4, so they can scrub
  // reliably even when Safari reports only four logical cores. Keep the
  // low-power fallback for wider devices, where the larger asset costs more.
  const scrubEnabled =
    resolved && !reducedMotion && (narrow || !lowPower);

  const { videoRef, state, subscribe } = useScrollVideo({
    scopeRef,
    enabled: scrubEnabled,
  });

  /**
   * How much of the opening chapter's handwritten word has been drawn by the
   * load-in animation, 0-1. Scroll can only ever add to this, never undo it, so
   * the word is whole from the first moment and still arrives by hand.
   */
  const introInk = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !scrubEnabled) return;

    const chapters = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-chapter]"),
    ).map((element, index) => ({
      element,
      isOpening: index === 0,
      start: Number(element.dataset.start ?? 0),
      end: Number(element.dataset.end ?? 1),
      ink: element.querySelector<HTMLElement>("[data-hero-ink]"),
      setOpacity: gsap.quickSetter(element, "opacity") as (v: number) => void,
      setY: gsap.quickSetter(element, "y", "px") as (v: number) => void,
    }));

    const aperture = stage.querySelector<HTMLElement>("[data-aperture]");
    const spark = stage.querySelector<HTMLElement>("[data-spark]");
    const rail = stage.querySelector<HTMLElement>("[data-rail]");
    const hint = stage.querySelector<HTMLElement>("[data-hint]");

    const setApertureRadius = aperture
      ? (gsap.quickSetter(aperture, "--aperture-r", "vmax") as (v: number) => void)
      : null;
    const setApertureOpacity = aperture
      ? (gsap.quickSetter(aperture, "opacity") as (v: number) => void)
      : null;
    const setSparkOpacity = spark
      ? (gsap.quickSetter(spark, "opacity") as (v: number) => void)
      : null;
    const setSparkScale = spark
      ? (gsap.quickSetter(spark, "scale") as (v: number) => void)
      : null;
    const setRail = rail
      ? (gsap.quickSetter(rail, "scaleY") as (v: number) => void)
      : null;
    const setHint = hint
      ? (gsap.quickSetter(hint, "opacity") as (v: number) => void)
      : null;

    const unsubscribe = subscribe((progress) => {
      for (const chapter of chapters) {
        const local = localProgress(progress, chapter.start, chapter.end);
        const alpha = envelope(local, 0.22, !chapter.isOpening);

        chapter.setOpacity(alpha);
        chapter.setY((1 - alpha) * 22);

        // The handwriting is written by the scroll: the ink wipe follows the
        // chapter's own progress, not a timed animation that happens nearby.
        // The opening word is the exception - it is drawn once on load, and
        // scrolling can only keep it drawn.
        if (chapter.ink) {
          const byScroll = Math.min(Math.max((local - 0.12) / 0.4, 0), 1);
          const written = chapter.isOpening
            ? Math.max(byScroll, introInk.current)
            : byScroll;
          chapter.ink.style.clipPath = `inset(-20% ${(1 - written) * 100}% -20% 0)`;
        }
      }

      // Chapter 01 - the idea arriving as a point of light, opening into the
      // lens. The aperture is a radial hole punched through a black plate; it
      // grows from nothing to past the corners of the screen.
      if (setApertureRadius && setApertureOpacity) {
        const open = localProgress(progress, 0, 0.16);
        setApertureRadius(0.6 + open * open * 120);
        setApertureOpacity(open >= 1 ? 0 : 1);
      }

      if (setSparkOpacity && setSparkScale) {
        // Alight from the very first frame: at rest the visitor should see a
        // point of light in the dark, not an empty screen.
        const gone = localProgress(progress, 0.04, 0.13);
        setSparkOpacity(1 - gone);
        setSparkScale(0.75 + gone * 3.2);
      }

      if (setRail) setRail(progress);
      if (setHint) setHint(1 - localProgress(progress, 0, 0.05));
    });

    // Draw the opening handwritten word on load. `introInk` is read by the
    // subscriber above, so the scroll handler and this tween never fight over
    // the same style property.
    const intro = gsap.to(introInk, {
      current: 1,
      duration: 0.95,
      delay: 0.5,
      ease: "power2.inOut",
      onUpdate: () => {
        const opening = chapters[0];
        if (!opening?.ink) return;
        const written = Math.max(introInk.current, 0);
        opening.ink.style.clipPath = `inset(-20% ${(1 - written) * 100}% -20% 0)`;
      },
    });

    return () => {
      intro.kill();
      unsubscribe();
    };
  }, [subscribe, scrubEnabled]);

  const posterHidden = scrubEnabled && state === "ready";

  return (
    <>
      <section
        ref={scopeRef}
        // The header watches this element to decide when to go solid: while the
        // hero still covers the top of the viewport it stays transparent.
        id="hero-sentinel"
        aria-label="Abertura - da ideia ao frame"
        className="relative"
        style={{
          // Give the playhead enough runway that one wheel gesture advances
          // only a small part of the footage. Desktop spans roughly twelve
          // usable screens; phones stay shorter because each screen costs a
          // full swipe, while still giving every chapter room to breathe.
          height: scrubEnabled ? (narrow ? "900vh" : "1300vh") : "auto",
        }}
      >
        <div
          ref={stageRef}
          className={
            scrubEnabled
              ? "sticky top-0 h-svh w-full overflow-hidden bg-ink-950"
              : "relative min-h-svh w-full overflow-hidden bg-ink-950"
          }
        >
          {/* --- the footage ------------------------------------------- */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: posterHidden ? 1 : 0 }}
            poster={heroMedia.poster}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          >
            <source
              src={heroMedia.mp4Mobile}
              type="video/mp4"
              media="(max-width: 767px)"
            />
            <source src={heroMedia.mp4} type="video/mp4" />
            <source src={heroMedia.webm} type="video/webm" />
          </video>

          {/* Poster sits on top until a real frame has been decoded, so the
              first thing on screen is never black and never a frozen frame. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroMedia.poster}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: posterHidden ? 0 : 1 }}
          />

          {/* --- grading ---------------------------------------------- */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-ink-950/55"
          />

          {/* --- chapter 01: aperture + spark -------------------------- */}
          {scrubEnabled ? (
            <>
              <div
                data-aperture
                aria-hidden="true"
                className="absolute inset-0"
                style={
                  {
                    "--aperture-r": "0.6vmax",
                    background:
                      "radial-gradient(circle at 46% 47%, transparent 0, transparent var(--aperture-r), #030304 calc(var(--aperture-r) * 1.75), #030304 100%)",
                  } as React.CSSProperties
                }
              />
              <div
                data-spark
                aria-hidden="true"
                className="absolute left-[46%] top-[47%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
                style={{
                  background:
                    "radial-gradient(circle, #ffffff 0%, #d99bff 22%, rgba(164,0,255,0.55) 45%, transparent 70%)",
                }}
              />
            </>
          ) : null}

          {/* The page's heading. Visible when the hero is static; carried by
              the chapter panels when it scrubs, where it would fight the
              footage - so it stays in the accessibility tree instead of being
              removed. Either way the document has exactly one <h1>. */}
          {scrubEnabled ? (
            <h1 className="sr-only">
              {site.name} — da ideia ao frame. {site.positioning}
            </h1>
          ) : null}

          {/* --- narrative -------------------------------------------- */}
          {scrubEnabled ? (
            heroChapters.map((chapter, index) => (
              <HeroChapterPanel
                key={chapter.kicker || index}
                chapter={chapter}
                index={index}
              />
            ))
          ) : (
            <StaticHeroCopy />
          )}

          {/* --- chrome ------------------------------------------------ */}
          {scrubEnabled ? (
            <>
              <div
                aria-hidden="true"
                className="absolute right-(--spacing-gutter) top-1/2 hidden h-40 w-px -translate-y-1/2 bg-white/12 md:block"
              >
                <span
                  data-rail
                  className="absolute inset-x-0 top-0 h-full origin-top bg-bolt-500"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              <div
                data-hint
                aria-hidden="true"
                className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
              >
                <span className="text-micro uppercase tracking-[0.22em] text-metal-300">
                  Role
                </span>
                <span className="h-8 w-px bg-gradient-to-b from-bolt-500 to-transparent" />
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
};

/**
 * What the hero becomes when scrubbing is off: the same four beats, stacked and
 * readable, over the poster frame. No motion required to receive the message.
 */
const StaticHeroCopy = () => (
  <div className="relative flex min-h-svh flex-col justify-end px-(--spacing-gutter) pb-20 pt-32">
    <div className="mx-auto w-full max-w-(--width-shell)">
      <p className="mb-5 text-micro uppercase tracking-[0.22em] text-bolt-400">
        {site.positioning}
      </p>
      <h1 className="max-w-[16ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50">
        Da ideia ao <span className="script text-bolt-400">frame</span>
      </h1>
      <ul className="mt-10 flex flex-col gap-2.5 border-t border-white/10 pt-6 text-lead text-paper-100/75">
        {heroChapters
          .filter((chapter) => chapter.line)
          .map((chapter) => (
            <li key={chapter.kicker}>
              {chapter.line}{" "}
              <span className="script text-bolt-400">{chapter.scriptWord}</span>
            </li>
          ))}
      </ul>
    </div>
  </div>
);
