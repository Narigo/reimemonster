const { splitSyllables } = require("./split-syllables");

function countSyllables(text) {
  const simpleText = text || "";
  return splitSyllables(simpleText).length;
}

function countSyllablesByLine(text) {
  const simpleText = text || "";
  return simpleText.split(/\n/).map(countSyllables);
}

module.exports = {
  countSyllables,
  countSyllablesByLine
};
