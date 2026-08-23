import type { ReactNode } from "react";
import { isPending, type Pending } from "@/content/types";

interface PendingValueProps<T> {
  readonly value: Pending<T>;
  /** What the field is, used in the placeholder and for assistive tech. */
  readonly label: string;
  readonly render: (value: T) => ReactNode;
}

/**
 * Renders a content field, or an honest placeholder if the agency has not
 * confirmed it yet.
 *
 * The point is that an unconfirmed value can never be mistaken for a real one.
 * In development it is called out in the brand violet so it is impossible to
 * miss during review; in production it degrades to a quiet, truthful
 * "a confirmar" rather than a fabricated phone number or a made-up statistic.
 *
 * @see docs/content-confirmation.md
 */
export const PendingValue = <T,>({ value, label, render }: PendingValueProps<T>) => {
  if (!isPending(value)) return <>{render(value)}</>;

  const isDev = process.env.NODE_ENV === "development";

  return (
    <span
      data-pending={label}
      className={
        isDev
          ? "border border-dashed border-bolt-500/60 px-1.5 py-0.5 text-bolt-400"
          : "text-metal-500"
      }
    >
      {label}: a confirmar
    </span>
  );
};
