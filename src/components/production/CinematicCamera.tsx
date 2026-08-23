"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

const CameraCanvas = dynamic(
  () => import("./CameraCanvas").then((mod) => mod.CameraCanvas),
  { ssr: false },
);

interface CinematicCameraProps {
  readonly interactive: boolean;
  readonly motionEnabled: boolean;
  readonly render3D: boolean;
}

/**
 * Loads the WebGL camera only when this section is close to the viewport.
 * A poster rendered from the same Sony model covers its loading state, so the
 * composition never flashes empty while the GLB is downloaded and decoded.
 */
export const CinematicCamera = ({
  interactive,
  motionEnabled,
  render3D,
}: CinematicCameraProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0.5);
  const [nearViewport, setNearViewport] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  const markModelReady = useCallback(() => setModelReady(true), []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !render3D) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "75% 0px" },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [render3D]);

  useGSAP(
    () => {
      const host = hostRef.current;
      if (!host || !motionEnabled) return;

      gsap.fromTo(
        host,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: host,
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.to(scrollProgressRef, {
        current: 1,
        ease: "none",
        scrollTrigger: {
          trigger: host,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: hostRef, dependencies: [motionEnabled] },
  );

  const showCanvas = render3D && nearViewport;

  return (
    <div ref={hostRef} className="camera-stage absolute inset-0">
      <Image
        src="/media/brand/sony-camera-poster.png"
        alt="Câmera Sony profissional da estrutura de produção da FULL"
        width={855}
        height={700}
        sizes="(max-width: 1024px) 100vw, 55vw"
        className={cn(
          "camera-render absolute inset-0 h-full w-full object-contain transition-opacity duration-700",
          modelReady && showCanvas ? "opacity-0" : "opacity-100",
        )}
      />

      {showCanvas ? (
        <div
          aria-hidden="true"
          className={cn(
            "camera-canvas absolute inset-0 transition-opacity duration-700",
            modelReady ? "opacity-100" : "opacity-0",
          )}
        >
          <CameraCanvas
            interactive={interactive}
            motionEnabled={motionEnabled}
            scrollProgressRef={scrollProgressRef}
            onReady={markModelReady}
          />
        </div>
      ) : null}
    </div>
  );
};
