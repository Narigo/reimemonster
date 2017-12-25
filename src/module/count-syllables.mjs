export function countSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(exceptionSplitter, [])
    .map(word => word.split(/[aeiouäöüy]{1,2}/i).length - 1)
    .reduce((sum, x) => sum + x, 0);
}

export function countSyllablesByLine(text) {
  const simpleText = text || "";
  return simpleText.split(/\n/).map(countSyllables);
}

function exceptionSplitter(words, word) {
  const splitOnException = word => {
    const uelException = /^(.*[^q]u)(el.*)$/gi.exec(word);
    if (uelException) {
      return [...splitOnException(uelException[1]), ...splitOnException(uelException[2])];
    }
    const ionException = /^(.*i)(on.*)$/gi.exec(word);
    if (ionException) {
      return [...splitOnException(ionException[1]), ...splitOnException(ionException[2])];
    }
    return [word];
  };
  const exceptions = splitOnException(word);
  return [...words, ...exceptions];
}
