export interface SplitHeadline {
  /** The part set in the sans face. */
  readonly head: string;
  /** The trailing phrase set in the script face, if there is one. */
  readonly script: string | undefined;
}

/**
 * Splits a headline into its sans run and its handwritten tail.
 *
 * The script phrase has to be a *suffix* of the headline. Anything else would
 * reorder the sentence when the two halves are re-joined - "Identidade visual"
 * with the accent on "Identidade" would render as "visual Identidade". Rather
 * than trust every call site to get that right, a phrase that is not a suffix
 * is ignored and the headline renders whole, in the sans face. Wrong emphasis
 * is a small problem; a scrambled sentence is a large one.
 */
export const splitScriptWord = (
  title: string,
  scriptWord?: string,
): SplitHeadline => {
  if (!scriptWord) return { head: title, script: undefined };

  if (!title.endsWith(scriptWord)) {
    return { head: title, script: undefined };
  }

  return {
    head: title.slice(0, title.length - scriptWord.length).trimEnd(),
    script: scriptWord,
  };
};
