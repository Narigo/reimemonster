const {splitSyllables} = require("./splitSyllables");


function countSyllables(text) {
  if (text === null || text === undefined || text === "") {
    return 0;
  } else {
    return splitSyllables(text).length;
  }
}

module.exports = {
  countSyllables
};
