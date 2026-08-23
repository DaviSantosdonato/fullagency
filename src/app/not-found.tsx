import Link from "next/link";
import { BoltMark } from "@/components/ui/BoltMark";
import { HandwrittenAccent } from "@/components/ui/HandwrittenAccent";
import { footerNav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="shell flex min-h-svh flex-col justify-center py-32">
      <p className="mb-7 flex items-center gap-3 text-micro uppercase tracking-[0.22em] text-bolt-400">
        <BoltMark className="h-3 w-2" />
        Erro 404
      </p>

      <h1 className="max-w-[14ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50">
        Essa página saiu do{" "}
        <HandwrittenAccent immediate>quadro</HandwrittenAccent>
      </h1>

      <p className="mt-8 max-w-(--width-measure) text-lead text-paper-100/70">
        O link pode ter mudado de lugar. Estes continuam funcionando:
      </p>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
        {footerNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-h3 font-light tracking-[-0.02em] text-paper-100/60 transition-colors hover:text-paper-50"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
