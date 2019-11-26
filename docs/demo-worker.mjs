import { findRhyme } from "../src/module/find-rhyme.mjs";

self.addEventListener(
  "message",
  message => {
    const word = message.data;
    const rhymes = findRhyme(word);
    const result = { word, rhymes: rhymes.join(", ") };
    self.postMessage(JSON.stringify(result));
  },
  false
);
