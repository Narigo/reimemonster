import { countSyllablesByLine } from "./src/module/count-syllables.mjs";

const $poem = document.getElementById("poem");
const $helper = document.getElementById("helper");
const $rhymes = document.getElementById("rhymes");
const lastPoem = localStorage.getItem("poem");

$poem.value = lastPoem + $poem.value;
$poem.focus();

$poem.oninput = () => {
  const textValue = $poem.value;
  const countedSyllables = countSyllablesByLine(textValue);
  localStorage.setItem("poem", textValue);
  $helper.innerHTML = countedSyllables.reduce(
    (lastLineInfos, syllablesInLine) => {
      const lineInfos = { ...lastLineInfos };
      lineInfos.lineNumber = lastLineInfos.lineNumber + 1;
      lineInfos.syllables = syllablesInLine;
      const shouldWarn =
        syllablesInLine !== 0 && lastLineInfos.syllables !== 0 && lineInfos.syllables !== lastLineInfos.syllables;
      lineInfos.html = `${lineInfos.html}<span class="${shouldWarn ? "warn" : "ok"}">${syllablesInLine}</span><br />`;
      return lineInfos;
    },
    {
      lineNumber: 0,
      syllables: 0,
      html: ""
    }
  ).html;
};

const worker = new Worker("./demo-worker.js");
worker.addEventListener("message", message => {
  console.log("received input from worker");
  $rhymes.innerText = message.data;
  $rhymes.classList.remove("hidden");
});

$poem.onselect = () => {
  const textValue = $poem.value;
  const word = getWordFromPosition(textValue, $poem.selectionStart, $poem.selectionEnd);
  console.log("sending word to worker", word);
  worker.postMessage(word);
};

const ESC_KEYCODE = 27;
document.addEventListener("keyup", event => {
  if (event.keyCode === ESC_KEYCODE) {
    event.preventDefault();
    event.stopPropagation();
    $rhymes.classList.toggle("hidden");
  }
});

$rhymes.addEventListener("pointerup", () => {
  $rhymes.classList.add("hidden");
  window.getSelection().collapse($poem, 0);
});

function getWordFromPosition(text, positionStart, positionEnd) {
  return text.substring(positionStart, positionEnd);
}
