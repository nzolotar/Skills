const fs = require("fs");

function decode(inputFilePath) {
  try {
    const data = fs.readFileSync(inputFilePath, "utf8");
    const lines = data.trim().split("\n");

    // Split each line into the number and the word
    const encodedMessage = lines
    .map(line => line.trim())
    .filter(line => line !== '') 
    .map(line => {
      const [num, word] = line.split(' ');
      return [parseInt(num), word.trim().replace(/\r/g, '')];
    });

    // Sort the list based on the numbers
     encodedMessage.sort((a, b) => a[0] - b[0]);

  const maxNum = encodedMessage[encodedMessage.length - 1][0];

  // Initialize variables for building the decoded message
  let decodedMessage = [];
  let currentLine = 1;
  let currentNum = 1;

  // Iterate until we reach the end of the pyramid
  while (currentNum <= maxNum) {
    //find end of line 
    let endOfLine = currentLine * (currentLine + 1) / 2;
     // Find the word at the end of the line 
      const word = encodedMessage.find(pair => pair[0] === endOfLine)?.[1] || '';
     // Add the word to the decoded message
      decodedMessage.push(word);
    // Move to the next line
    currentLine++;
    // Move to the next number
    currentNum++;
  }

  return decodedMessage.join(" ").trim();

  } catch (err) {
    console.error(`File ${inputFilePath} error: ${err}`);
    return "";
  }
}

console.log(decode("./e1/testSource.txt"));
