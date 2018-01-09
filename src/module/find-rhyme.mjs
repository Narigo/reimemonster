import germanWordList from "./wordlists/german.mjs";
const defaultWordList = germanWordList.split(/\n/);

export function findRhyme(word, { words = defaultWordList } = {}) {
  const wordToFindRhymeFor = word.replace(/(\w+)([\W]*$)/, "$1");
  const matchesMultiVocals = /^(.*?)([aeiouäöü]+[^aeiouäöü]*[aeiouäöü][^aeiouäöü]*$)/i.exec(wordToFindRhymeFor);
  if (matchesMultiVocals) {
    return findRhymeForMatch(matchesMultiVocals, { words });
  }

  const matchesSingleVocal = /^(.*?)([aeiouäöü]+[^aeiouäöü]*$)/i.exec(wordToFindRhymeFor);
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
