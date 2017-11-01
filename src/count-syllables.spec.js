const assert = require("assert");
const { countSyllables } = require("./count-syllables");

describe("count-syllables", () => {
  it("should count 0 for undefined", () => {
    assert.equal(countSyllables(), 0);
  });

  it("should count 0 for null", () => {
    assert.equal(countSyllables(), 0);
  });

  it("should count 0 for the empty string", () => {
    assert.equal(countSyllables(""), 0);
  });

  it("should count 1 for a simple word", () => {
    assert.equal(countSyllables("wort"), 1);
  });

  it("should count 2 for not so simple words", () => {
    assert.equal(countSyllables("wörter"), 2);
  });

  it("should work well with punctuation", () => {
    assert.equal(countSyllables("Wie - das frage ich! - viele Silben hat dieser Text(?), oder was das ist."), 17);
  });
});
