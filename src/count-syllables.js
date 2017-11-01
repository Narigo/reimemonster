const { splitSyllables } = require("./splitSyllables");

function countSyllables(text) {
  const simpleText = text || "";
  return splitSyllables(simpleText).length;
}

module.exports = {
  countSyllables
};
