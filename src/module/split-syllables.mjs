export function splitSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(splitter, [])
    .filter(x => x !== "");
}

function splitter(syllables, wordPart) {
  // split list can have three parts
  // r: (required) a regular expression with groups where to split the part of the word
  // e: (optional) an array which groups to exclude from splitting (if you need to match something inside a group)
  // d: (optional) an array which groups are done and do not need further splitting
  const splitList = [
    { r: /^(.*[^s])(chen)(.*)$/gi, d: [2] },
    { r: /^(.*e)([ao].*)$/gi },
    { r: /^(.*i)(a.*)$/gi },
    { r: /^(.*a)(o.*)$/gi },
    { r: /^(.*[^q]u)(el.*)$/gi },
    { r: /^(.*i)(on.*)$/gi },
    { r: /^(.*i)(um.*)$/gi },
    { r: /^(.*ä)(us.*)$/gi },
    { r: /^(.*e)(ta)(e)(be.*)$/gi },
    { r: /^(.*zu)(er.*)$/gi },
    { r: /^(.*bak)(te)(ri)(e.*)$/gi },
    { r: /^(.*topf)(er.*)$/i },
    { r: /^(.*)(fort)(schritt)(.*)$/i, d: [2, 3] },
    { r: /^(.*)(zen)(tra)(.*)$/i, d: [2, 3] },
    { r: /^(.*)(ma)(schi)(ne.*)$/i, d: [2, 3] },
    { r: /^(.*)(sys)(te)(me.*)$/i, d: [2, 3] },
    { r: /^(.*)(sys)(tem)$/i, d: [2, 3] },
    { r: /^(.*)(brech)(.*)$/i, d: [2] },
    { r: /^(.*)(st[aeiouäöü][^aeiouäöüy])(.*)$/i, d:[2] },
    { r: /^(.*ech)(er.*)$/i },
    { r: /^(ab)(ar)(.*)$/gi, d: [1, 2] },
    { r: /^(.*)(schal)(.*)$/gi, d: [2] },
    { r: /^(ab)(b[^aeiouäöüy][aeiouäöüy][^aeiouäöüy])(.*)$/gi, d: [1, 2] },
    { r: /^(Aas)(gei)(er.*)$/gi },
    { r: /^(Bahn)(ü)(ber)(gang)$/gi },
    { r: /^(Po)(ly)(styr)(ol)$/i, d:[1, 2, 3, 4] },
    { r: /^(.*ge)(schwin)(dig.*)$/gi, d: [2] },
    { r: /^(.*)(keit)$/gi, d: [2] },
    { r: /^(.*[aeiouäöüy]{2})([aeiouäöüy]+.*)$/i },
    { r: /^(.+)([^aeiouäöüy][aeiouäöüy]{1,2}[^aeiouäöüy]*)$/i, d: [2] }
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
