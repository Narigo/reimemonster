function countSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(exceptionSplitter, [])
    .map((syllables) => syllables.split(/[aeiouäöüy]{1,2}/i).length - 1)
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
    /^(no)(ah)$/gi,
  ];
  const splitOnException = (part) => {
    for (let i = 0; i < exceptionsList.length; i++) {
      const matches = exceptionsList[i].exec(part);
      if (matches) {
        const splits = matches.slice(1);
        return splits.reduce((acc, split) => acc.concat(splitOnException(split)), []);
      }
    }
    return [part];
  };
  const exceptions = splitOnException(wordPart);
  return [...syllables, ...exceptions];
}

const REPOSITORY = "reimemonster";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(`/${REPOSITORY}/sw.js`, { scope: `/${REPOSITORY}/` }).catch((e) => {
    console.log("registered service failed!", e);
  });
}

const $poem = document.getElementById("poem");
const $helper = document.getElementById("helper");
const $rhymes = document.getElementById("rhymes");
const $suggestions = document.getElementById("suggestions");
const $savedPoems = document.getElementById("saved-poems");
const $reloadButton = document.getElementById("reload-button");
const $removeSavedButton = document.getElementById("remove-saved-button");
const savedPoems = JSON.parse(localStorage.getItem("poems")) || [];
const options = JSON.parse(localStorage.getItem("options")) || { selectedPoemIndex: 0 };

$poem.focus();

refreshSavedPoemsSelector();

$savedPoems.onchange = (e) => {
  const poemIdx = JSON.parse(e.target.value);
  options.selectedPoemIndex = poemIdx;
  localStorage.setItem("options", JSON.stringify(options));
  $poem.value = savedPoems[poemIdx] || "";
};

$reloadButton.onclick = (e) => {
  e.preventDefault();
  refreshSavedPoemsSelector();
};

$removeSavedButton.onclick = (e) => {
  e.preventDefault();
  if (window.confirm("Willst Du diesen Text wirklich löschen? 😢")) {
    const poemIdx = $savedPoems.selectedIndex;
    const nextPoemIdx = Math.max(0, poemIdx - 1);
    $savedPoems.removeChild($savedPoems.options[$savedPoems.selectedIndex]);
    savedPoems.splice(poemIdx, 1);
    options.selectedPoemIndex = nextPoemIdx;
    localStorage.setItem("options", JSON.stringify(options));
    localStorage.setItem("poems", JSON.stringify(savedPoems));
    $poem.value = savedPoems[nextPoemIdx] || "";
    refreshSavedPoemsSelector();
  }
};

$poem.oninput = () => {
  const textValue = $poem.value;
  const countedSyllables = countSyllablesByLine(textValue);
  savedPoems[$savedPoems.options[$savedPoems.selectedIndex].value] = textValue;
  localStorage.setItem("poems", JSON.stringify(savedPoems));
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
      html: "",
    }
  ).html;
};

const worker = new Worker("./demo-worker.js");
worker.addEventListener("message", (message) => {
  const data = JSON.parse(message.data);
  $rhymes.innerHTML = `<h2>Reimvorschläge für ${data.word}:</h2><p>${data.rhymes}</p>`;
  $rhymes.classList.remove("hidden");
});

const ESC_KEYCODE = 27;
document.addEventListener("keyup", (event) => {
  if (event.keyCode === ESC_KEYCODE) {
    event.preventDefault();
    event.stopPropagation();
    toggleRhymeHelper();
  }
});

document.addEventListener(
  "selectionchange",
  () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const word = selection.toString();
      if (word.trim() !== "") {
        fetchRhymesForWord(word);
      }
    }
  },
  false
);

const fetchRhymesForWord = (word) => {
  worker.postMessage(word);
  $rhymes.innerText = `Suche nach ${word} ...`;
};

$suggestions.addEventListener("click", (event) => {
  toggleRhymeHelper();
});

$rhymes.addEventListener("click", () => {
  $rhymes.classList.add("hidden");
  window.getSelection().collapse($poem, 0);
});

function toggleRhymeHelper() {
  $rhymes.classList.toggle("hidden");
}

function refreshSavedPoemsSelector() {
  while ($savedPoems.children.length > 0) {
    $savedPoems.removeChild($savedPoems.firstChild);
  }

  savedPoems.forEach((poem, idx) => {
    const firstLineOfPoem = poem.split(/\n/)[0];
    const isSelected = idx === options.selectedPoemIndex;
    const $option = document.createElement("option");
    $option.selected = isSelected;
    $option.value = idx;
    $option.text = firstLineOfPoem !== "" ? firstLineOfPoem : `(Text ${idx + 1})`;
    $savedPoems.appendChild($option);

    if (isSelected) {
      $poem.value = poem;
    }
  });

  const $option = document.createElement("option");
  $option.selected = savedPoems.length === options.selectedPoemIndex;
  $option.value = savedPoems.length;
  $option.text = `Neuer Text ...`;
  $savedPoems.appendChild($option);
}
