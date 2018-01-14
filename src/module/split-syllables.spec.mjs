import assert from "assert";
import { splitSyllables } from "./split-syllables.mjs";

describe("split-syllables", () => {
  describe.only("simple words", () => {
    testWord("Wort", ["Wort"]);
    testWord("oder", ["o", "der"]);
    testWord("Ameise", ["A", "mei", "se"]);
    testWord("Wörter", ["Wör", "ter"]);
    testWord("Eimer", ["Ei", "mer"]);
    testWord("immer", ["im", "mer"]);
  });

  it("should split a single word in a one element array", () => {
    assert.deepEqual(splitSyllables("wort"), ["wort"]);
  });

  it("should split a single word in a one element array", () => {
    assert.deepEqual(splitSyllables("oder"), ["o", "der"]);
  });

  it("should split a three syllable word into three syllables", () => {
    assert.deepEqual(splitSyllables("Ameise"), ["A", "mei", "se"]);
  });

  it("should split two single words in a two element array", () => {
    assert.deepEqual(splitSyllables("wort wort"), ["wort", "wort"]);
  });

  it("should split these words into two element arrays", () => {
    assert.deepEqual(splitSyllables("worte"), ["wor", "te"]);
  });

  it("should split each word for itself", () => {
    assert.deepEqual(splitSyllables("worte wort worte"), ["wor", "te", "wort", "wor", "te"]);
  });

  it("should split correctly on more complicated words", () => {
    assert.deepEqual(splitSyllables("wer will viele silben zählen"), [
      "wer",
      "will",
      "vie",
      "le",
      "sil",
      "ben",
      "zäh",
      "len"
    ]);
  });

  it("should split more complicated words correctly", () => {
    assert.deepEqual(splitSyllables("Zeppeline"), ["Zep", "pe", "li", "ne"]);
  });

  it("should work well with punctuation", () => {
    assert.deepEqual(splitSyllables("Wie - das frage ich! - viele Silben hat dieser Text(?), oder was das ist."), [
      "Wie",
      "das",
      "fra",
      "ge",
      "ich",
      "vie",
      "le",
      "Sil",
      "ben",
      "hat",
      "die",
      "ser",
      "Text",
      "o",
      "der",
      "was",
      "das",
      "ist"
    ]);
  });

  function testWord(word, syllableList) {
    it(`'${word}' should be split into '${syllableList.join("·")}'`, () => {
      expect(splitSyllables(word)).toEqual(syllableList);
    });
  }
});
