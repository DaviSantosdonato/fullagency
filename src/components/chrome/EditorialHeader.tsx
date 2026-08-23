"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FullLogo } from "./FullLogo";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/cn";
import { ctaLabel, primaryNav } from "@/content/site";

/**
 * Transparent while the hero owns the screen, solid the moment it does not.
 *
 * The switch is driven by an IntersectionObserver on `#hero-sentinel` — a
 * zero-height marker the cinematic hero drops at its own end. Pages without a
 * hero simply have no sentinel, and the header falls back to a short scroll
 * threshold so it is never transparent over body copy.
 */
export const EditorialHeader = () => {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  // Close the menu when the route changes. This is React's documented
  // "adjust state during render" pattern rather than an effect: an effect here
  // would render the new route with the menu still open, then render again to
  // close it.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const sentinel = document.querySelector("#hero-sentinel");

    if (sentinel) {
      const observer = new IntersectionObserver(
        // The negative top inset is the header's own height: the hero counts as
        // "behind the bar" only while it reaches under it.
        ([entry]) => setSolid(!entry?.isIntersecting),
        { rootMargin: "-80px 0px 0px 0px", threshold: 0 },
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }

    const onScroll = (): void => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Stable across renders: MobileMenu's focus trap keys off this identity, and
  // a new function each render would re-arm the trap and steal focus.
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        ref={headerRef}
        data-solid={solid || undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          "border-b border-transparent",
          solid &&
            "border-white/8 bg-ink-950/85 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/70",
        )}
      >
        <div className="shell flex h-18 items-center justify-between gap-6 py-4 md:h-20">
          <Link
            href="/"
            aria-label="FULL Agência — início"
            className="shrink-0 transition-opacity duration-300 hover:opacity-70"
          >
            <FullLogo priority />
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative text-caption uppercase tracking-[0.14em] text-paper-100/70 transition-colors duration-300 hover:text-paper-50",
                        active && "text-paper-50",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-bolt-500 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contato"
              className="hidden items-center gap-2 border border-paper-100/20 px-5 py-2.5 text-caption uppercase tracking-[0.14em] text-paper-50 transition-colors duration-300 hover:border-bolt-500 hover:bg-bolt-500 md:inline-flex"
            >
              {ctaLabel}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="-mr-2 flex items-center gap-2.5 p-2 text-caption uppercase tracking-[0.14em] text-paper-50 md:hidden"
            >
              Menu
              <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
};
