"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { BoltMark } from "@/components/ui/BoltMark";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { ctaLabel, footerNav, socials } from "@/content/site";

interface MobileMenuProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

/**
 * Full-screen editorial menu.
 *
 * Handles the three things a hand-rolled dialog usually gets wrong: Escape to
 * close, a focus trap while open, and restoring focus to whatever opened it.
 * The panel stays mounted and hidden so the transition can play out, but
 * `inert` removes it from the tab order and the accessibility tree when
 * closed — no `aria-hidden` element ever holds focus.
 */
export const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  // `onClose` must be referentially stable, or every re-render of the header
  // would tear this effect down and set it up again - pulling focus back to the
  // first menu item out from under whoever was tabbing through it. The header
  // wraps it in `useCallback` for exactly that reason.
  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = (): HTMLElement[] =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      restoreFocusTo.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      // `inert` is the modern way to take a whole subtree out of tab order and
      // the a11y tree, and it cannot be defeated by a focused descendant.
      inert={!open}
      aria-label="Menu"
      className={`fixed inset-0 z-60 flex flex-col bg-ink-950 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="shell flex h-18 shrink-0 items-center justify-between py-4">
        <span className="text-micro uppercase tracking-[0.2em] text-metal-300">
          Navegação
        </span>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 p-2 text-caption uppercase tracking-[0.14em] text-paper-50"
        >
          Fechar
        </button>
      </div>

      <nav aria-label="Navegação mobile" className="shell flex flex-1 flex-col justify-center">
        <ul className="flex flex-col gap-1">
          {footerNav.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-2 text-h2 font-light tracking-[-0.03em] text-paper-50"
              >
                <span className="text-micro tabular-nums text-metal-500">
                  0{index + 1}
                </span>
                {item.label}
                <BoltMark className="h-4 w-3 shrink-0 -translate-x-2 self-center text-bolt-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="shell shrink-0 pb-10">
        <Link
          href="/contato"
          onClick={onClose}
          className="mb-8 flex items-center justify-between border-t border-white/10 pt-6 text-lead text-paper-50"
        >
          <span>
            {ctaLabel} <HandwrittenAccent immediate>agora</HandwrittenAccent>
          </span>
          <BoltMark className="text-bolt-500" />
        </Link>

        <ul className="flex gap-6">
          {socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-micro uppercase tracking-[0.18em] text-metal-300 transition-colors hover:text-paper-50"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
