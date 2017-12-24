const createHyphenator = require("hyphen");
const defaultHyphenatorPattern = require("hyphen/patterns/de");

const defaultHyphenChar = "\u00AD";

function splitSyllables(text, { hyphenChar = defaultHyphenChar, hyphenatorPattern = defaultHyphenatorPattern } = {}) {
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

module.exports = {
  splitSyllables
};
