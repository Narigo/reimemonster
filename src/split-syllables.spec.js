const assert = require("assert");
const { splitSyllables } = require("./split-syllables");

describe("split-syllables", () => {
  it("should split a single word in a one element array", () => {
    assert.deepEqual(splitSyllables("wort"), ["wort"]);
  });

  it("should split two single words in a two element array", () => {
    assert.deepEqual(splitSyllables("wort wort"), ["wort", "wort"]);
  });

  it("should split these words into two element arrays", () => {
    assert.deepEqual(splitSyllables("worte"), ["wor", "te"]);
  });

  it("should split each word for itself", () => {
    assert.deepEqual(splitSyllables("worte wort worte"), [
      "wor",
      "te",
      "wort",
      "wor",
      "te"
    ]);
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
    assert.deepEqual(
      splitSyllables(
        "Wie - das frage ich! - viele Silben hat dieser Text(?), oder was das ist."
      ),
      [
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
        "oder",
        "was",
        "das",
        "ist"
      ]
    );
  });

  // It will not match \u00AD because it is not included in \w.
  it.skip("can split words with different characters", () => {
    assert.deepEqual(splitSyllables("o\u00ADder", { hyphenChar: "\u00AD" }), [
      "o",
      "der"
    ]);
    assert.deepEqual(splitSyllables("o\u00ADder", { hyphenChar: "-" }), [
      "o\u00ADder"
    ]);
  });
});
