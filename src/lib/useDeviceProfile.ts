"use client";

import { useEffect, useState } from "react";

export interface DeviceProfile {
  /** The user asked the OS for less animation. */
  readonly reducedMotion: boolean;
  /** No fine pointer — hover affordances must not carry meaning. */
  readonly coarsePointer: boolean;
  /** Narrow viewport, measured once on the client. */
  readonly narrow: boolean;
  /**
   * Low CPU/memory budget. Video scrubbing and WebGL degrade here, so the
   * cinematic layers swap themselves for static compositions.
   */
  readonly lowPower: boolean;
  /** False during SSR and the first paint, so markup stays deterministic. */
  readonly resolved: boolean;
}

const INITIAL: DeviceProfile = {
  reducedMotion: false,
  coarsePointer: false,
  narrow: false,
  lowPower: false,
  resolved: false,
};

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

/**
 * Reads the environment once and then only on the things that can actually
 * change: the reduced-motion preference and the viewport width.
 *
 * Everything is resolved in an effect rather than during render, so the server
 * and the first client paint always agree.
 */
export const useDeviceProfile = (): DeviceProfile => {
  const [profile, setProfile] = useState<DeviceProfile>(INITIAL);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const widthQuery = window.matchMedia("(max-width: 767px)");

    const nav = navigator as NavigatorWithMemory;
    const cores = nav.hardwareConcurrency ?? 8;
    const memory = nav.deviceMemory ?? 8;

    const read = (): void => {
      const coarsePointer = pointerQuery.matches;
      const narrow = widthQuery.matches;

      setProfile({
        reducedMotion: motionQuery.matches,
        coarsePointer,
        narrow,
        // The threshold keeps video decoding and the 3D scene off constrained
        // devices without treating every touch device as low power.
        lowPower: cores <= 4 || memory <= 2,
        resolved: true,
      });
    };

    read();

    motionQuery.addEventListener("change", read);
    widthQuery.addEventListener("change", read);
    pointerQuery.addEventListener("change", read);

    return () => {
      motionQuery.removeEventListener("change", read);
      widthQuery.removeEventListener("change", read);
      pointerQuery.removeEventListener("change", read);
    };
  }, []);

  return profile;
};
