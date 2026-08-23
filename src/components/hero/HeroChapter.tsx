import type { HeroChapter as Chapter } from "@/content/types";

/**
 * One beat of the hero narrative.
 *
 * Rendered as plain, fully-formed markup: the copy is in the HTML on first
 * paint, in reading order, whether or not the scroll machinery ever runs. The
 * hero's ticker only ever adjusts opacity, transform and a clip — never the
 * text itself.
 */
export const HeroChapterPanel = ({
  chapter,
  index,
}: {
  readonly chapter: Chapter;
  readonly index: number;
}) => {
  if (!chapter.line) return null;

  return (
    <div
      data-chapter
      data-start={chapter.start}
      data-end={chapter.end}
      className="pointer-events-none absolute inset-x-0 bottom-0 px-(--spacing-gutter) pb-28 md:pb-24"
      style={{ opacity: 0 }}
    >
      <div className="mx-auto w-full max-w-(--width-shell)">
        <p className="mb-4 text-micro uppercase tracking-[0.22em] text-bolt-400 md:mb-5">
          {chapter.kicker}
        </p>
        <p className="max-w-[18ch] text-h1 font-light leading-[0.95] tracking-[-0.04em] text-paper-50 md:max-w-[20ch]">
          {chapter.line}{" "}
          {chapter.scriptWord ? (
            <span
              data-hero-ink
              className="script text-bolt-400"
              style={{ clipPath: "inset(-20% 100% -20% 0)" }}
            >
              {chapter.scriptWord}
            </span>
          ) : null}
        </p>
      </div>
      <span className="sr-only">
        Capítulo {index + 1} de 4 da abertura em vídeo.
      </span>
    </div>
  );
};
