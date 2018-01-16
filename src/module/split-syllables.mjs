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
    .reduce(splitter, [])
    .filter(x => x !== "");
}

function splitter(syllables, wordPart) {
  // split list is a r(regular expression) and might have e(xcluded) groups to jump over (necessary when nesting re-groups)
  const splitList = [
    // parts beginning with vowels have just that vowels
    // { r: /^([aeiouäöüy]{1,2})(.*[aeiouäöüy].*)$/gi },
    // two vowels usually have a split directly after them
    // { r: /^([^aeiouäöüy]*[aeiouäöüy]{2})(.*[aeiouäöüy].*)$/gi },
    // { r: /^(.*([^aeiouäöüy]))(\2.*[aeiouäöüy].*)$/gi, e: [2] }, // split on m-m, n-n, t-t, etc. if a vowel follows later
    { r: /^(.+)([^aeiouäöüy][aeiouäöüy]{1,2}[^aeiouäöüy]*)$/i, d: [2] } // split last part of word
  ];
  const splitOnPart = part => {
    for (let i = 0; i < splitList.length; i++) {
      const re = splitList[i].r;
      const done = splitList[i].d;
      const excludes = splitList[i].e;
      const matches = re.exec(part);
      if (matches) {
        const splits = matches.slice(1);
        return splits.reduce((acc, split, idx) => {
          if (split.length > 0 && !(excludes && excludes.includes(idx + 1))) {
            // part is considered splitted
            if (done && done.includes(idx + 1)) {
              return acc.concat(split);
            }
            return acc.concat(splitOnPart(split));
          }
          return acc;
        }, []);
      }
    }
    return [part];
  };
  const mergeParts = parts =>
    parts.reduce((list, part, idx) => {
      if (idx > 0) {
        const lastPart = list[idx - 1];
        const lastPartIsConsonantOnly = /^[^aeiouäöüy]+$/i.test(lastPart);
        const thisPartIsConsonantOnly = /^[^aeiouäöüy]+$/i.test(part);
        if (!lastPartIsConsonantOnly && thisPartIsConsonantOnly) {
          return [...list.slice(0, list.length - 1), list[idx - 1] + part];
        } else if (lastPartIsConsonantOnly) {
          return [...list.slice(0, list.length - 1), list[idx - 1] + part];
        }
      }
      return [...list, part];
    }, []);
  const splittedParts = splitOnPart(wordPart);
  const mergedParts = mergeParts(splittedParts);
  return [...syllables, ...mergedParts];
}
