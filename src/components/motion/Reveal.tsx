"use client";

import {
  useRef,
  type ElementType,
  type ForwardRefExoticComponent,
  type HTMLAttributes,
  type ReactNode,
  type RefAttributes,
} from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

export type RevealKind = "up" | "mask";

interface RevealProps {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly kind?: RevealKind;
  readonly className?: string;
  /** Seconds of delay after the element enters. */
  readonly delay?: number;
  /** Stagger direct children instead of animating the element as one block. */
  readonly stagger?: number;
}

/** The shape any intrinsic tag satisfies once it is chosen at runtime. */
type PolymorphicTag = ForwardRefExoticComponent<
  HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>
>;

/**
 * The single scroll-entrance primitive.
 *
 * Everything on the site that arrives on scroll comes through here, which is
 * what stops the page from accumulating a dozen slightly different triggers.
 * `useGSAP` scopes the animation and reverts it on unmount, so the
 * ScrollTriggers it creates are cleaned up with the component.
 */
export const Reveal = ({
  children,
  as = "div",
  kind = "up",
  className,
  delay = 0,
  stagger,
}: RevealProps) => {
  const scope = useRef<HTMLElement>(null);
  const Tag = as as unknown as PolymorphicTag;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const targets = stagger ? Array.from(root.children) : root;

      const from =
        kind === "mask"
          ? { clipPath: "inset(-30% -10% 100% -10%)", opacity: 1 }
          : { y: 32, opacity: 0 };

      // The mask must finish *outside* the border box. Ending on `inset(0…)`
      // clips whatever overflows it - which for the script face means its
      // descenders get sliced off the moment the reveal completes.
      const to =
        kind === "mask"
          ? { clipPath: "inset(-30% -10% -35% -10%)", opacity: 1 }
          : { y: 0, opacity: 1 };

      gsap.fromTo(targets, from, {
        ...to,
        duration: kind === "mask" ? 1.1 : 0.9,
        ease: "expo.out",
        delay,
        stagger: stagger ?? 0,
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope, dependencies: [kind, delay, stagger] },
  );

  return (
    <Tag
      ref={scope}
      className={cn(className)}
      // When staggering, the children carry their own start state, so the
      // wrapper must not be hidden or it would hide them all at once.
      data-reveal={stagger ? undefined : kind}
    >
      {children}
    </Tag>
  );
};
