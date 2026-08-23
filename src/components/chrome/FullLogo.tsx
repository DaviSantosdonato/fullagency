import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * The official lockup. Served from the agency's own artwork rather than
 * retraced, so the letterforms and the bolt stay exactly as approved.
 */
export const FullLogo = ({
  className,
  priority = false,
}: {
  readonly className?: string;
  readonly priority?: boolean;
}) => (
  <Image
    src="/media/brand/full-logo.png"
    alt={site.name}
    width={1673}
    height={473}
    priority={priority}
    sizes="(max-width: 768px) 96px, 128px"
    className={cn("h-7 w-auto md:h-8", className)}
  />
);
