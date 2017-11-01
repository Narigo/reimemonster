const { splitSyllables } = require("./splitSyllables");

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
