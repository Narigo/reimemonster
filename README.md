# Reimemonster

This repository contains helpers for making poems. For example it counts syllables and helps you find rhyming words.

Currently only usable in German.

## Usage

You can either use the API or use the `npm` commands from the command line.

### API usage

First, install the module via `npm`.

```
npm install reimemonster
```

#### findRhyme
```
findRhyme(word: String): String[]
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
countSyllables(text: String): Integer
```

This will count the number of syllables in a text by using the `hyphen` module. It uses `hyphen` to find splitting 
possibilities and counts these. This is not always working out well, for example the word "oder" should not be 
hyphenated but should actually be counted as two syllables in context of a poem.

### Command line usage

You can use the command line tools by cloning this repository and run the `npm` commands.

To count syllables in verses, you can use this command for example:  

```
npm run start | cat
```

To get out of this mode, press `CTRL`+`D`.

To find a rhyming word, use this command:

```
npm run rhyme <your-word>
```

## Acknowledgements

German wordlist from [anagram.tips](https://raw.githubusercontent.com/Haspaker/anagram.tips/1d2c39c9675597304565d7245a19c133d7fbc301/words/de/dict/german.wordlist.txt).
