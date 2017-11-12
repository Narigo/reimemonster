const createHyphenator = require("hyphen");
const hyphenationPatternsDe = require("hyphen/patterns/de");

const defaultHyphenChar = "\u00AD";

function splitSyllables(text, { hyphenChar = defaultHyphenChar } = {}) {
  const hyphenate = createHyphenator(hyphenationPatternsDe, {
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

module.exports = {
  splitSyllables
};
