import { findRhyme } from "./src/module/find-rhyme.mjs";

self.addEventListener(
  "message",
  message => {
    const rhymes = findRhyme(message.data);
    const result = rhymes.join(", ");
    self.postMessage(result);
  },
  false
);
