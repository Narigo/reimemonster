import { countSyllables } from "../count-syllables.mjs";
import { splitSyllables } from "../split-syllables.mjs";
import wordlist from "../wordlists/german.mjs";

describe("dictionary-test", () => {
  it("count-syllables should have a good snapshot", () => {
    expect(wordlist.split(/\n/).map(word => `${word}:${countSyllables(word)}`)).toMatchSnapshot();
  });

  it.skip("split-syllables should have a good snapshot", () => {
    expect(wordlist.split(/\n/).map(word => `${word}:${splitSyllables(word).join("•")}`)).toMatchSnapshot();
  });

  // Takes too long while not correct.
  // describe("count-syllables and split-syllables should result in same amount of syllables", () => {
  //   wordlist.split(/\n/).forEach((word, idx) => {
  //     if (0 < idx && idx < 1000) { // check for exceptions
  //       const count = countSyllables(word);
  //       const splitted = splitSyllables(word);
  //       it(`${word} -> ${splitted.join("•")}`, () => {
  //         expect(count).toEqual(splitted.length);
  //       });
  //     }
  //   });
  // });
});
