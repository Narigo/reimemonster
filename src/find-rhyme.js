const wordlist = require("./wordlists/german.json");

function findRhyme(word) {
  const matchesMultiVocals = /^(.*)([aeiouäöü][^aeiouäöü]*[aeiouäöü][^aeiouäöü]*$)/i.exec(word);
  if (matchesMultiVocals) {
    return findRhymeForMatch(matchesMultiVocals);
  }

  const matchesSingleVocal = /^(.*)([aeiouäöü][^aeiouäöü]*$)/i.exec(word);
  if (matchesSingleVocal) {
    return findRhymeForMatch(matchesSingleVocal);
  }

  return [];
}

function findRhymeForMatch(matches) {
  const searchPattern = new RegExp(`${matches[2]}$`, "i");
  const startsWithVocal = matches[1] === "" || matches[1].match(/[aeiouäöü]+/i);
  const sameWord = new RegExp(`${matches[1]}${matches[2]}$`, "i");
  return wordlist.reduce((results, word) => {
    if (word.match(searchPattern) && (startsWithVocal || !word.match(sameWord))) {
      return [...results, word];
    } else {
      return results;
    }
  }, []);
}

module.exports = {
  findRhyme
};
