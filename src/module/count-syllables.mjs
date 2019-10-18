export function countSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(exceptionSplitter, [])
    .map(syllables => syllables.split(/[aeiouäöüy]{1,2}/i).length - 1)
    .reduce((sum, x) => sum + x, 0);
}

export function countSyllablesByLine(text) {
  const simpleText = text || "";
  return simpleText.split(/\n/).map(countSyllables);
}

function exceptionSplitter(syllables, wordPart) {
  const exceptionsList = [
    /^(.*e)([ao].*)$/gi,
    /^(.*i)(a.*)$/gi,
    /^(.*a)(o.*)$/gi,
    /^(.*[^q]u)(el.*)$/gi,
    /^(.*i)(on.*)$/gi,
    /^(.*i)(um.*)$/gi,
    /^(.*ä)(us.*)$/gi,
    /^(.*e)(ta)(e)(be.*)$/gi,
    /^(.*zu)(er.*)$/gi,
    /^(.*bak)(te)(ri)(e.*)$/gi,
    /^(no)(ah)$/gi
  ];
  const splitOnException = part => {
    for (let i = 0; i < exceptionsList.length; i++) {
      const matches = exceptionsList[i].exec(part);
      if (matches) {
        const splits = matches.slice(1);
        return splits.reduce((acc, split) => acc.concat(splitOnException(split)), []);
      }
    }
    return [part];
  };
  const exceptions = splitOnException(wordPart);
  return [...syllables, ...exceptions];
}
