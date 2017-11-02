const wordlist = require("./wordlists/german.json");

function findRhyme(word) {
  const matches = /^(.*)([aeiouäöü][^aeiouäöü]*[aeiouäöü][^aeiouäöü]*$)/i.exec(word);
  if (matches) {
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
  } else {
    return [];
  }
}

module.exports = {
  findRhyme
};
