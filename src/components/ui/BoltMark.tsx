import { cn } from "@/lib/cn";

/**
 * The bolt from the FULL wordmark, redrawn as vector so it stays crisp at
 * favicon size and can take `currentColor`.
 */
export const BoltMark = ({ className }: { readonly className?: string }) => (
  <svg
    viewBox="0 0 24 32"
    className={cn("h-4 w-3", className)}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14.8 0 0 18.2h7.1L5.4 32 20 13.4h-7.4z" />
  </svg>
);
