
// counter - unnecessary here
// .map(syllables => {
//   console.log(text, "->", syllables);
//   return syllables.length > 0 ? 1 : 0;
// })

// splits
// /^([aeiouäöüy]{2})(.*)$/gi,
//   /^([aeiouäöüy]{1,2}.+?)(.+?[aeiouäöüy]+.*)$/gi,
//   /^(.+[aeiouäöüy]{1,2}.*)(.*[aeiouäöüy]+.*)$/gi

// a few tests
// describe.only("test", () => {
//   testWord("Eumel", ["Eu", "mel"]);
//   testWord("immer", ["im", "mer"]);
//   testWord("Eimerlauf", ["Ei", "mer", "lauf"]);
// });

export function splitSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(splitter, []);
}

function splitter(syllables, wordPart) {
  const splitList = [
    /^([^aeiouöüäy]*[aeiouäöüy]{2})(.*[aeiouäöüy].*)$/gi,
    /^(.*?)([^aeiouäöüy][aeiouäöüy]{1,2}[^aeiouäöüy])(.*)$/gi,
    /^(.*?[aeiouäöüy]{1,2}[^aeiouäöüy])(.*)$/gi,
    /^(.*?[aeiouäöüy]{1,2}[^aeiouäöüy])(.*)$/gi
  ];
  const splitOnPart = part => {
    for (let i = 0; i < splitList.length; i++) {
      const matches = splitList[i].exec(part);
      if (matches) {
        const splits = matches.slice(1);
        return splits.reduce((acc, split) => acc.concat(split.length > 0 ? splitOnPart(split) : []), []);
      }
    }
    return [part];
  };
  const splittedParts = splitOnPart(wordPart);
  return [...syllables, ...splittedParts];
}
