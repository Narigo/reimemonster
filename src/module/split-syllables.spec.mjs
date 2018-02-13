import assert from "assert";
import { splitSyllables } from "./split-syllables.mjs";

describe("split-syllables", () => {
  describe("exception cases", () => {
    it("should result in an empty list for no argument", () => {
      expect(splitSyllables()).toEqual([]);
    });

    it("should result in an empty list for an empty string", () => {
      expect(splitSyllables("")).toEqual([]);
    });

    it("should result in an empty list for punctuation only", () => {
      expect(splitSyllables(" .!-&(){}|>:,</\\")).toEqual([]);
    });
  });

  describe("simple single words", () => {
    testWord("der", ["der"]);
    testWord("die", ["die"]);
    testWord("das", ["das"]);
    testWord("Wort", ["Wort"]);
    testWord("kann", ["kann"]);
    testWord("was", ["was"]);
    testWord("laut", ["laut"]);
  });

  describe("two-syllable words", () => {
    testWord("Wörter", ["Wör", "ter"]);
    testWord("oder", ["o", "der"]);
    testWord("Eimer", ["Ei", "mer"]);
    testWord("immer", ["im", "mer"]);
  });

  describe("three-syllable words", () => {
    testWord("Ameise", ["A", "mei", "se"]);
    testWord("Zeppelin", ["Zep", "pe", "lin"]);
  });

  describe("some harder to split words", () => {
    testWord("Aasgeier", ["Aas", "gei", "er"]);
    testWord("Aachen", ["Aa", "chen"]);
    testWord("Aachener", ["Aa", "chen", "er"]);
    testWord("abarbeiten", ["ab", "ar", "bei", "ten"]);
    testWord("Zeppeline", ["Zep", "pe", "li", "ne"]);
    testWord("Blumentopferde", ["Blu", "men", "topf", "er", "de"]);
    testWord("eventuell", ["e", "ven", "tu", "ell"]);
    testWord("Bahnübergang", ["Bahn", "ü", "ber", "gang"]);
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
