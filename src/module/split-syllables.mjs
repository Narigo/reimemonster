import createHyphenator from "hyphen";
import defaultHyphenatorPattern from "hyphen/patterns/de";

const defaultHyphenChar = "\u00AD";

export function splitSyllables(text, { hyphenChar = defaultHyphenChar, hyphenatorPattern = defaultHyphenatorPattern } = {}) {
  const hyphenate = createHyphenator(hyphenatorPattern, {
    hyphenChar
  });

  const words = text.split(/[^\wäöüÄÖÜß']+/);
  return words.reduce((acc, word) => {
    const splitWord = hyphenate(word)
      .split(hyphenChar)
      .filter(w => w !== "");
    return [...acc, ...splitWord];
  }, []);
}
