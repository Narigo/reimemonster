const { findRhyme } = require("../module/find-rhyme");

const wordToFindRhymeFor = process.argv[2];

console.log(findRhyme(wordToFindRhymeFor).join("\n"));
