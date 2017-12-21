function countSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .map(word => word.split(/[aeiouäöüy]{1,2}/i).length - 1)
    .reduce((sum, x) => sum + x, 0);
}

function countSyllablesByLine(text) {
  const simpleText = text || "";
  return simpleText.split(/\n/).map(countSyllables);
}

module.exports = {
  countSyllables,
  countSyllablesByLine
};
