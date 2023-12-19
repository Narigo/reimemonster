# Reimemonster 
[![Build Status](https://travis-ci.org/Narigo/reimemonster.svg?branch=master)](https://travis-ci.org/Narigo/reimemonster)
[![Coverage Status](https://coveralls.io/repos/github/Narigo/reimemonster/badge.svg?branch=master)](https://coveralls.io/github/Narigo/reimemonster?branch=master)

This repository contains helpers for making poems. For example it counts syllables and helps you 
find rhyming words.

Currently only usable in German. See it in action on the [Reimemonster demonstration 
page](https://narigo.github.com/reimemonster). It saves your last poem to the localstorage, lets 
you search for rhymes by selecting a word and shows the amount of syllables in the lines on the 
side.

## Usage

You can either use the API or use the `npm` commands from the command line.

### API usage

First, install the module via `npm`.

```
npm install reimemonster
```

#### findRhyme
```
findRhyme(word: string): string[]
```

`findRhyme` will present you a list of Strings that may rhyme on your word by checking their 
ending. For example, `findRhyme("anleiern")` results in a list like this:

```
[
  "Aasgeiern",
  "Abschiedsfeiern",
  "Abschlussfeiern",
  "Befreiern",
  "Brautschleiern",
  ...
]
```

#### countSyllables
```
countSyllables(text: string): integer
```

This will count the number of syllables in a text by using a custom splitter with regular expressions. There are some words for which this approach does not work, because they can be split up in several ways. For example "Millionen" could be divided as "Mil-li-o-nen" or "Mil-lio-nen", depending on how you would pronounce it.

### Command line usage

You can use the command line tools by cloning this repository and run the `npm` commands.

To count syllables in verses, you can use this command for example:  

```
pnpm run start
```

To get out of this mode, press `CTRL`+`D`.

To find a rhyming word, use this command:

```
pnpm run rhyme <your-word>
```

## Acknowledgements

- German wordlist from [anagram.tips](https://raw.githubusercontent.com/Haspaker/anagram.tips/1d2c39c9675597304565d7245a19c133d7fbc301/words/de/dict/german.wordlist.txt).
- Another wordlist scraped from Wikipedia from [aaabbb.de](http://www.aaabbb.de/WordList/WordList_en.php) (see [german-wiki-checked.txt](./german-wiki-checked.txt)
