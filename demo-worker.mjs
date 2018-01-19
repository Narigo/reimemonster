// import { findRhyme } from "./src/module/find-rhyme.mjs";

const findRhyme = text => ["dies", "ist", "ein", "test"];

self.addEventListener(
  "message",
  message => {
    const rhymes = findRhyme(message.data);
    const result = rhymes.join(", ");
    self.postMessage(result);
  },
  false
);
