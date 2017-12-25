import { findRhyme } from "../module/find-rhyme.mjs";

const wordToFindRhymeFor = process.argv[2];

console.log(findRhyme(wordToFindRhymeFor).join("\n"));
