import { HandwrittenAccent } from "./HandwrittenAccent";
import { BoltMark } from "./BoltMark";
import { Reveal } from "@/components/motion/Reveal";
import { splitScriptWord } from "@/lib/splitScriptWord";

interface PageIntroProps {
  readonly kicker: string;
  readonly title: string;
  /**
   * A phrase inside `title` to set in the script face. It is removed from the
   * sans run and re-rendered, so the sentence never contains it twice.
   */
  readonly scriptWord?: string;
  readonly lead: string;
}

/**
 * The masthead every inner page opens with.
 *
 * It carries the page's single `<h1>` and leaves generous space beneath the
 * fixed header, which is why the top padding is stated here once rather than
 * repeated on each route.
 */
export const PageIntro = ({ kicker, title, scriptWord, lead }: PageIntroProps) => {
  const { head, script } = splitScriptWord(title, scriptWord);

  return (
    <section className="shell pb-16 pt-36 md:pb-24 md:pt-48">
      <Reveal>
        <p className="mb-7 flex items-center gap-3 text-micro uppercase tracking-[0.22em] text-bolt-400">
          <BoltMark className="h-3 w-2" />
          {kicker}
        </p>
      </Reveal>

      <Reveal kind="mask">
        <h1 className="max-w-[16ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50">
          {head}{" "}
          {script ? <HandwrittenAccent>{script}</HandwrittenAccent> : null}
        </h1>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mt-9 max-w-(--width-measure) text-lead text-paper-100/70">
          {lead}
        </p>
      </Reveal>
    </section>
  );
};
