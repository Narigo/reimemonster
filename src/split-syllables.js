const createHyphenator = require("hyphen");
const hyphenationPatternsDe = require("hyphen/patterns/de");

const hyphenate = createHyphenator(hyphenationPatternsDe, {
  hyphenChar: "\u00AD"
});

function splitSyllables(text) {
  const words = text.split(/[^\wäöüÄÖÜß']+/);
  return words.reduce((acc, word) => {
    const splitWord = hyphenate(word).split(/\u00AD/).filter(w => w !== "");
    return [...acc, ...splitWord];
  }, []);
}

module.exports = {
  splitSyllables
};
