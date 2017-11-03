const assert = require("assert");
const { findRhyme } = require("./find-rhyme");

describe("find-rhyme", () => {
  it("should return an array", () => {
    assert.deepEqual(findRhyme(""), []);
  });

  it("should return possible rhymes", () => {
    const rhymingWords = findRhyme("Haus");
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
});
