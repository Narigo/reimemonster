import germanWordList from "./wordlists/german.mjs";
const defaultWordList = germanWordList.split(/\n/);

export function findRhyme(word, { words = defaultWordList } = {}) {
  const matchesMultiVocals = /^(.*?)([aeiouäöü]+[^aeiouäöü]*[aeiouäöü][^aeiouäöü]*$)/i.exec(word);
  if (matchesMultiVocals) {
    return findRhymeForMatch(matchesMultiVocals, { words });
  }

  const matchesSingleVocal = /^(.*?)([aeiouäöü]+[^aeiouäöü]*$)/i.exec(word);
  if (matchesSingleVocal) {
    return findRhymeForMatch(matchesSingleVocal, { words });
  }

  return [];
}

function findRhymeForMatch(matches, { words }) {
  const searchPattern = new RegExp(`${matches[2]}$`, "i");
  const startsWithVocal = matches[1] === "" || matches[1].match(/[aeiouäöü]+/i);
  const sameWord = new RegExp(`${matches[1]}${matches[2]}$`, "i");
  const mayRhyme = word => word.match(searchPattern) && (startsWithVocal || !word.match(sameWord));

  return words.reduce((results, word) => (mayRhyme(word) ? [...results, word] : results), []);
}
