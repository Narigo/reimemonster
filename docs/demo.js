function countSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(exceptionSplitter, [])
    .map(syllables => syllables.split(/[aeiouäöüy]{1,2}/i).length - 1)
    .reduce((sum, x) => sum + x, 0);
}

function countSyllablesByLine(text) {
  const simpleText = text || "";
  return simpleText.split(/\n/).map(countSyllables);
}

function exceptionSplitter(syllables, wordPart) {
  const exceptionsList = [
    /^(.*e)([ao].*)$/gi,
    /^(.*i)(a.*)$/gi,
    /^(.*a)(o.*)$/gi,
    /^(.*[^q]u)(el.*)$/gi,
    /^(.*i)(on.*)$/gi,
    /^(.*i)(um.*)$/gi,
    /^(.*ä)(us.*)$/gi,
    /^(.*e)(ta)(e)(be.*)$/gi,
    /^(.*zu)(er.*)$/gi,
    /^(.*bak)(te)(ri)(e.*)$/gi,
    /^(no)(ah)$/gi
  ];
  const splitOnException = part => {
    for (let i = 0; i < exceptionsList.length; i++) {
      const matches = exceptionsList[i].exec(part);
      if (matches) {
        const splits = matches.slice(1);
        return splits.reduce((acc, split) => acc.concat(split.length > 0 ? splitOnException(split) : []), []);
      }
    }
    return [part];
  };
  const exceptions = splitOnException(wordPart);
  return [...syllables, ...exceptions];
}

const REPOSITORY = "reimemonster";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(`/${REPOSITORY}/sw.js`, { scope: `/${REPOSITORY}/` }).catch(e => {
    console.log("registered service failed!", e);
  });
}

const $poem = document.getElementById("poem");
const $helper = document.getElementById("helper");
const $rhymes = document.getElementById("rhymes");
const $suggestions = document.getElementById("suggestions");
const lastPoem = localStorage.getItem("poem") || "";

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
  $rhymes.innerText = message.data;
  $rhymes.classList.remove("hidden");
});

$poem.onselect = () => {
  const textValue = $poem.value;
  const word = getWordFromPosition(textValue, $poem.selectionStart, $poem.selectionEnd);
  worker.postMessage(word);
};

const ESC_KEYCODE = 27;
document.addEventListener("keyup", event => {
  if (event.keyCode === ESC_KEYCODE) {
    event.preventDefault();
    event.stopPropagation();
    toggleRhymeHelper();
  }
});

$suggestions.addEventListener("pointerup", () => {
  toggleRhymeHelper();
});

$rhymes.addEventListener("pointerup", () => {
  $rhymes.classList.add("hidden");
  window.getSelection().collapse($poem, 0);
});

function getWordFromPosition(text, positionStart, positionEnd) {
  return text.substring(positionStart, positionEnd);
}

function toggleRhymeHelper() {
  $rhymes.classList.toggle("hidden");
}
