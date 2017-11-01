const split = require("split");
const { countSyllables } = require("./count-syllables");

process.stdin.pipe(split(/(\r?\n)/)).on("data", line => {
  process.stdout.write(countSyllables(line) + " " + line);
});
