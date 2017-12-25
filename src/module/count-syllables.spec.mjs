import assert from "assert";
import { countSyllables, countSyllablesByLine } from "./count-syllables.mjs";

function testWord(word, num) {
  return it(`should count ${num} for '${word}'`, () => {
    assert.equal(countSyllables(word), num);
  });
}

describe("count-syllables", () => {
  it("should count 0 for undefined", () => {
    assert.equal(countSyllables(), 0);
  });

  it("should count 0 for null", () => {
    assert.equal(countSyllables(null), 0);
  });

  it("should count 0 for the empty string", () => {
    assert.equal(countSyllables(""), 0);
  });

  it("should count 1 for a simple word", () => {
    assert.equal(countSyllables("wort"), 1);
  });

  it("should not count 'n as new word/syllable", () => {
    assert.equal(countSyllables("seh'n"), 1);
  });

  it("should count 2 for not so simple words", () => {
    assert.equal(countSyllables("wörter"), 2);
  });

  testWord("oder", 2);
  testWord("Ameise", 3);
  testWord("Bedeutung", 3);
  testWord("teuer", 2);
  testWord("Xylophon", 3);

  it(`should count correctly for '-uelle'`, () => {
    assert.equal(countSyllables("Intellektuelle"), 6);
    assert.equal(countSyllables("visuelle"), 4);
    assert.equal(countSyllables("textuellen"), 4);
    assert.equal(countSyllables("spirituellen"), 5);
    assert.equal(countSyllables("quellen"), 2);
    assert.equal(countSyllables("Quellenintellektuel"), 7);
  });

  it("should count correctly for 'ion'", () => {
    assert.equal(countSyllables("Bastion"), 3);
    assert.equal(countSyllables("Millionen"), 4);
    assert.equal(countSyllables("Ion"), 2);
  });

  it("should work well with punctuation", () => {
    assert.equal(countSyllables("Wie - das frage ich! - viele Silben hat dieser Text(?), oder was das ist."), 18);
  });
});

describe("count-syllables by line", () => {
  it("should count 0 for undefined", () => {
    assert.deepEqual(countSyllablesByLine(), [0]);
  });

  it("should count 0 for null", () => {
    assert.deepEqual(countSyllablesByLine(null), [0]);
  });

  it("should count 0 for the empty string", () => {
    assert.deepEqual(countSyllablesByLine(""), [0]);
  });

  it("should not filter out empty lines", () => {
    assert.deepEqual(countSyllablesByLine("\n"), [0, 0]);
  });

  it("should count 1 for a simple word", () => {
    assert.deepEqual(countSyllablesByLine("wort"), [1]);
  });

  it("should not count 'n as new word/syllable", () => {
    assert.deepEqual(countSyllablesByLine("seh'n"), [1]);
  });

  it("should count 2 for not so simple words", () => {
    assert.deepEqual(countSyllablesByLine("wörter"), [2]);
  });

  it("should work well with punctuation", () => {
    assert.deepEqual(
      countSyllablesByLine(`Dies ist ein Test.
        Wie - das frage ich! - viele Silben hat dieser Text(?), oder was das ist.`),
      [4, 18]
    );
  });
});
