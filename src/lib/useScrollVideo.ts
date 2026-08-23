"use client";

import { type RefObject, useCallback, useEffect, useRef, useState } from "react";
import { ScrollTrigger, gsap } from "./gsap";

export type ScrollVideoState = "loading" | "ready" | "unsupported";

export interface ScrollVideoResult {
  /** Attach to the `<video>`. */
  readonly videoRef: RefObject<HTMLVideoElement | null>;
  /** `ready` only once a real frame has been decoded and seeked to. */
  readonly state: ScrollVideoState;
  /**
   * Normalised timeline position, 0–1. Read it through `subscribe` rather than
   * as state: it changes every frame and must not re-render React.
   */
  readonly subscribe: (listener: (progress: number) => void) => () => void;
}

export interface ScrollVideoOptions {
  /** The tall section whose scroll range drives the timeline. */
  readonly scopeRef: RefObject<HTMLElement | null>;
  /**
   * When false the hook stays inert — no ScrollTrigger, no ticker, no seeking.
   * Used for reduced motion and low-power devices, which get a still frame.
   */
  readonly enabled: boolean;
}

/**
 * How fast the played head chases the scroll position, as a time constant in
 * seconds. Small enough to feel bonded to the wheel, large enough to absorb
 * the jitter of a trackpad.
 */
const SMOOTHING_TAU = 0.085;

/**
 * Don't issue a seek for a difference smaller than half a frame at 24fps.
 * Sub-frame seeks cost a decode and change nothing on screen.
 */
const SEEK_EPSILON = 0.015;

/**
 * Drives an HTMLVideoElement's `currentTime` from the scroll position of a
 * section, in both directions.
 *
 * The seek target is written by ScrollTrigger and consumed by a single
 * `gsap.ticker` callback, so no matter how many scroll events fire, the video
 * is seeked at most once per animation frame. The playhead is smoothed toward
 * the target with a frame-rate-independent exponential filter rather than a
 * fixed lerp factor, so the feel is identical at 60Hz and 144Hz.
 *
 * The real `video.duration` is the only source of timing — nothing here
 * assumes a clip length.
 */
export const useScrollVideo = ({
  scopeRef,
  enabled,
}: ScrollVideoOptions): ScrollVideoResult => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [state, setState] = useState<ScrollVideoState>("loading");

  /** Where the scroll says the playhead should be, in seconds. */
  const targetTime = useRef(0);
  /** Where the smoothed playhead actually is, in seconds. */
  const currentTime = useRef(0);
  /** Normalised progress, mirrored to subscribers each frame. */
  const listeners = useRef(new Set<(progress: number) => void>());

  const subscribe = useCallback((listener: (progress: number) => void) => {
    listeners.current.add(listener);
    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const publish = useCallback((progress: number) => {
    for (const listener of listeners.current) listener(progress);
  }, []);

  /* ---- Prime the element -------------------------------------------------
   * A muted video will not decode a frame until something asks it to. Without
   * this the element sits on a black canvas until the first seek resolves,
   * which is exactly the "stuck on frame one" failure we have to avoid.
   * ---------------------------------------------------------------------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const markReady = (): void => {
      if (!cancelled) setState("ready");
    };

    const prime = async (): Promise<void> => {
      try {
        // Muted playback is permitted without a gesture; one play/pause cycle
        // forces the decoder to produce a frame and makes seeking work on iOS.
        await video.play();
        video.pause();
        video.currentTime = 0;
      } catch {
        // Autoplay refused (rare when muted). Seeking still works; we just
        // wait for the data event instead.
      }
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) markReady();
    };

    const onLoadedData = (): void => {
      void prime();
    };
    const onError = (): void => {
      if (!cancelled) setState("unsupported");
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("seeked", markReady);
    video.addEventListener("error", onError);

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) void prime();
    else video.load();

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", markReady);
      video.removeEventListener("error", onError);
    };
  }, []);

  /* ---- Drive the playhead ----------------------------------------------- */
  useEffect(() => {
    const scope = scopeRef.current;
    const video = videoRef.current;
    if (!scope || !video || !enabled) return;

    let rawProgress = 0;

    const trigger = ScrollTrigger.create({
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      // No `pin`: the stage uses CSS `position: sticky`, which unpins itself
      // naturally at the end of the section and injects no spacer element.
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        rawProgress = self.progress;
      },
      // Seed the playhead from wherever the page actually is. Without this,
      // `rawProgress` stays 0 until the first scroll event - so a reload with
      // restored scroll position, or a deep link landing mid-hero, would show
      // frame one over a page that is halfway through the sequence.
      onRefresh: (self) => {
        rawProgress = self.progress;
      },
    });

    rawProgress = trigger.progress;

    const tick = (_time: number, deltaMs: number): void => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      targetTime.current = rawProgress * duration;

      // Frame-rate independent exponential smoothing.
      const alpha = 1 - Math.exp(-(deltaMs / 1000) / SMOOTHING_TAU);
      currentTime.current += (targetTime.current - currentTime.current) * alpha;

      // Snap when we are close enough that further easing is invisible; this
      // guarantees the last frame is actually reached at the end of the scroll.
      if (Math.abs(targetTime.current - currentTime.current) < SEEK_EPSILON) {
        currentTime.current = targetTime.current;
      }

      if (Math.abs(video.currentTime - currentTime.current) > SEEK_EPSILON) {
        // Clamp inside the media range: seeking to exactly `duration` makes
        // some browsers fire `ended` and blank the frame.
        video.currentTime = Math.min(
          Math.max(currentTime.current, 0),
          duration - 0.001,
        );
      }

      publish(currentTime.current / duration);
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
    };
  }, [scopeRef, enabled, publish]);

  /* ---- Static fallback --------------------------------------------------- */
  useEffect(() => {
    if (enabled) return;
    // With scrubbing off, publish a stable mid-timeline position so any
    // progress-driven chrome renders a sensible resting state.
    publish(0);
  }, [enabled, publish]);

  return { videoRef, state, subscribe };
};
