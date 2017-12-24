const split = require("split");
const { countSyllables } = require("../module/count-syllables");

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
