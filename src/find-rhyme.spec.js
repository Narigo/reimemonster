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

  it("should not return words that end with the same word", () => {
    const rhymingWords = findRhyme("Haus");
    assert(rhymingWords.includes("Unterhaus") === false);
  });

  it("may return words that end with the same word if it did not start with a consonant", () => {
    const rhymingWords = findRhyme("aus");
    assert(rhymingWords.includes("Maus"));
  });
});
