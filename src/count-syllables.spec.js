import {countSyllables} from "./count-syllables.mjs";

describe("count-syllables", () => {
  it("should count 0 for undefined", () => {
    assert(countSyllables() === 0);
  });
  it("should count 0 for null", () => {
    assert(countSyllables() === 0);
  });
  it("should count 0 for the empty string", () => {
    assert(countSyllables("") === 0);
  });
});
