import assert from "assert";
import { findRhyme } from "./find-rhyme.mjs";

describe("find-rhyme", () => {
  it("should return an array", () => {
    assert.deepEqual(findRhyme(""), []);
  });

  it("should return possible rhymes", () => {
    const rhymingWords = findRhyme("Haus");
    assert(rhymingWords.includes("Laus"));
    assert(rhymingWords.includes("Maus"));
  });

  it("should not return words that are the same", () => {
    const rhymingWords = findRhyme("Haus");
    assert(rhymingWords.includes("Haus") === false);
  });

  it("should return possible rhymes for multi-vocal-words", () => {
    const rhymingWords = findRhyme("Hase");
    assert(rhymingWords.includes("Vase") === true);
  });

  it("should only return same ending words for multi-vocal-words", () => {
    const rhymingWords = findRhyme("Hase");
    assert(rhymingWords.includes("Rate") === false);
    assert(rhymingWords.includes("Muse") === false);
  });

  it("should not return words that end with the same word", () => {
    const rhymingWords = findRhyme("Haus");
    assert(rhymingWords.includes("Unterhaus") === false);
  });

  it("should find different words", () => {
    const rhymingWords = findRhyme("Test");
    assert(rhymingWords.includes("Pest"));
  });

  it("may return words that end with the same word if it did not start with a consonant", () => {
    const rhymingWords = findRhyme("aus");
    assert(rhymingWords.includes("Maus"));
  });

  it("should count multiple vocals in a row as single vocal", () => {
    const rhymingWords = findRhyme("laufen");
    assert(!rhymingWords.includes("Kufen"));
    assert(rhymingWords.includes("saufen"));
  });

  it("should be possible to have different word lists for findRhyme", () => {
    const rhymingWords = findRhyme("Haus", {
      words: ["Haus", "Maus", "raus", "Chaos"],
    });
    assert(!rhymingWords.includes("Chaos"));
    assert(!rhymingWords.includes("Laus"));
    assert(rhymingWords.includes("Maus"));
    assert(rhymingWords.includes("raus"));
  });

  it("should remove punctuation etc at the end of a word", () => {
    const rhymingWords = findRhyme("Haus...!", {
      words: ["Haus", "Maus", "raus", "Chaos"],
    });
    assert(!rhymingWords.includes("Chaos"));
    assert(!rhymingWords.includes("Laus"));
    assert(rhymingWords.includes("Maus"));
    assert(rhymingWords.includes("raus"));
  });
});
