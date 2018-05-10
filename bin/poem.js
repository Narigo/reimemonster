#!/usr/bin/env node

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var split = _interopDefault(require('split'));

function countSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(exceptionSplitter, [])
    .map(syllables => syllables.split(/[aeiouäöüy]{1,2}/i).length - 1)
    .reduce((sum, x) => sum + x, 0);
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
        return splits.reduce((acc, split$$1) => acc.concat(split$$1.length > 0 ? splitOnException(split$$1) : []), []);
      }
    }
    return [part];
  };
  const exceptions = splitOnException(wordPart);
  return [...syllables, ...exceptions];
}

const validate = process.argv[2] === "--validate";

let validateCount = 0;

process.stdin.pipe(split(/(\r?\n)/)).on("data", line => {
  const counted = countSyllables(line);
  if (validate && validateCount > 0 && counted > 0 && counted !== validateCount) {
    console.warn(`! ${counted} != ${validateCount}`);
  }

  if (counted > 0) {
    validateCount = counted;
    process.stdout.write(counted + " " + line);
  } else {
    process.stdout.write(line);
  }
});
