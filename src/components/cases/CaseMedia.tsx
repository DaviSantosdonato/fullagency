"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { MediaAsset } from "@/content/types";

interface CaseMediaProps {
  readonly media: MediaAsset;
  /** Optional clip played on hover. Desktop, fine-pointer devices only. */
  readonly hoverVideo?: string;
  readonly className?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
  /** Enables the hover clip. Passed down so the decision is made once, high up. */
  readonly canHover?: boolean;
}

/**
 * A case's cover, with an optional clip that takes over on hover.
 *
 * The video element is only created once the pointer is actually over the card,
 * and it is torn down on leave. That is the difference between a grid of eight
 * cases costing one image each and costing eight simultaneous video decoders -
 * which is what makes case walls jank on mid-range laptops.
 */
export const CaseMedia = ({
  media,
  hoverVideo,
  className,
  sizes = "(max-width: 768px) 80vw, 33vw",
  priority = false,
  canHover = false,
}: CaseMediaProps) => {
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const showVideo = Boolean(hoverVideo) && canHover && hovering;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) return;

    video.currentTime = 0;
    void video.play().catch(() => {
      // A refused autoplay just means the cover stays. Nothing to recover.
    });

    return () => video.pause();
  }, [showVideo]);

  return (
    <div
      className={cn("relative overflow-hidden bg-ink-800", className)}
      onPointerEnter={canHover ? () => setHovering(true) : undefined}
      onPointerLeave={canHover ? () => setHovering(false) : undefined}
    >
      <Image
        src={media.src}
        alt={media.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          showVideo ? "scale-105 opacity-0" : "scale-100 opacity-100",
        )}
      />

      {showVideo && hoverVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={hoverVideo}
          poster={media.poster ?? media.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
};
