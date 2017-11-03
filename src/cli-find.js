const { findRhyme } = require("./find-rhyme");

const wordToFindRhymeFor = process.argv[2];

console.log(findRhyme(wordToFindRhymeFor));
