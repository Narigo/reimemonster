import {countSyllablesByLine} from "./src/module/count-syllables.mjs";
import {findRhyme} from "./src/module/find-rhyme.mjs";

const $poem = document.getElementById("poem");
const $helper = document.getElementById("helper");
const $rhymes = document.getElementById("rhymes");
const minHeight = $poem.clientHeight;

$poem.focus();

$poem.oninput = () => {
  const textValue = $poem.value;
  const countedSyllables = countSyllablesByLine(textValue);
  $helper.innerHTML = countedSyllables.reduce((lastLineInfos, syllablesInLine) => {
      const lineInfos = {...lastLineInfos};
      lineInfos.lineNumber = lastLineInfos.lineNumber + 1;
      lineInfos.syllables = syllablesInLine;
      const shouldWarn = (syllablesInLine !== 0 && lastLineInfos.syllables !== 0 && lineInfos.syllables !== lastLineInfos.syllables);
      lineInfos.html = `${lineInfos.html}<span class="${shouldWarn ? "warn" : "ok"}">${syllablesInLine}</span><br />`;
      return lineInfos;
    },
    {
      lineNumber: 0,
      syllables: 0,
      html: ""
    }).html;
  const height = Math.max(minHeight, $helper.clientHeight);
  $poem.style.height = `${height}px`;
};

$poem.onselect = () => {
  const textValue = $poem.value;
  const word = getWordFromPosition(textValue, $poem.selectionStart, $poem.selectionEnd);
  if (word.length >= 4) {
    const rhymes = findRhyme(word);
    $rhymes.innerText = `${rhymes.join(", ")}`;
  }
};

$rhymes.addEventListener("pointerdown", () => {
  $rhymes.classList.toggle("hidden");
});

function getWordFromPosition(text, positionStart, positionEnd) {
  return text.substring(positionStart, positionEnd);
}
