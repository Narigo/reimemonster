const createHyphenator = require("hyphen");
const hyphenationPatternsDe = require("hyphen/patterns/de");

const hyphenChar = "\u00AD";

const hyphenate = createHyphenator(hyphenationPatternsDe, {
  hyphenChar
});

function splitSyllables(text) {
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
