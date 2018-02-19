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

  describe("undefined debug", () => {
    testWord("Bleistift", ["Blei", "stift"]);
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

  describe("Dictionary tests", () => {
    describe("A", () => {
      testWord("Aasgeier", ["Aas", "gei", "er"]);
      testWord("Aachen", ["Aa", "chen"]);
      testWord("Aachener", ["Aa", "chen", "er"]);
      testWord("abarbeiten", ["ab", "ar", "bei", "ten"]);
      testWord("Abbaufortschritt", ["Ab", "bau", "fort", "schritt"]);
      testWord("Abbestellens", ["Ab", "be", "stel", "lens"]);
      testWord("Abblendung", ["Ab", "blen", "dung"]);
      testWord("Abblendschalter", ["Ab", "blend", "schal", "ter"]);
      testWord("Abbaufortschritt", ["Ab", "bau", "fort", "schritt"]);
      testWord("Abbauleitzentrale", ["Ab", "bau", "leit", "zen", "tra", "le"]);
      testWord("Abbaumaschine", ["Ab", "bau", "ma", "schi", "ne"]);
      testWord("Abbausystem", ["Ab", "bau", "sys", "tem"]);
      testWord("Abbausysteme", ["Ab", "bau", "sys", "te", "me"]);
      testWord("Abbrecher", ["Ab", "brech", "er"]);
      testWord("Abbremsung", ["Ab", "brem", "sung"]);
      testWord("Abbruchunternehmen", ["Ab", "bruch", "un", "ter", "neh", "men"]);
      testWord("Abbuchens", ["Ab", "bu", "chens"]);
      testWord("Abbuchung", ["Ab", "bu", "chung"]);
    });

    describe("B-Z", () => {
      testWord("Bahnübergang", ["Bahn", "ü", "ber", "gang"]);
      testWord("Bleistift", ["Blei", "stift"]);
      testWord("Blumentopferde", ["Blu", "men", "topf", "er", "de"]);
      testWord("Geschwindigkeit", ["Ge", "schwin", "dig", "keit"]);
      testWord("eventuell", ["e", "ven", "tu", "ell"]);
      testWord("Polystyrol", ["Po", "ly", "styr", "ol"]);
      testWord("Zeppeline", ["Zep", "pe", "li", "ne"]);
    });
  });

  function testWord(word, syllableList) {
    it(`'${word}' should be split into '${syllableList.join("·")}'`, () => {
      expect(splitSyllables(word)).toEqual(syllableList);
    });
  }
});
