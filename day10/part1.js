const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);

function deleteCompleteChunks(line) {
  let oldLine = line
  let newLine = line
  do {
    oldLine = newLine
    newLine = oldLine.replace(/\(\)|\{\}|<>|\[\]/g, '')
  } while (newLine.length !== oldLine.length)

  return newLine
}

function firstInvalidChar(line) {
  const match = line.match(/\)|\}|>|\]/)
  return match ? match[0] : null
}

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const result = lines
  .map(line => deleteCompleteChunks(line))
  .map(line => firstInvalidChar(line))
  .filter(char => char !== null)
  .map(char => scoreMap[char])
  .reduce((tot, score) => tot + score, 0)

console.log(result)
