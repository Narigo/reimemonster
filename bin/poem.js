#!/usr/bin/env node

'use strict';

var split = require('split');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var split__default = /*#__PURE__*/_interopDefaultLegacy(split);

function countSyllables(text) {
  const simpleText = text || "";
  return simpleText
    .split(/[^\wäöüÄÖÜß']+/)
    .reduce(exceptionSplitter, [])
    .map((syllables) => syllables.split(/[aeiouäöüy]{1,2}/i).length - 1)
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

const validate = process.argv[2] === "--validate";

let validateCount = 0;

process.stdin.pipe(split__default['default'](/(\r?\n)/)).on("data", (line) => {
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
