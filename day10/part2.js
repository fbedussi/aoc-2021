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

function isInvalid(line) {
  const match = line.match(/\)|\}|>|\]/)
  return !!match
}

const scoreMap = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

function getScore(line) {
  return line.split('').reverse().reduce((tot, char) => {
    tot = tot * 5 + scoreMap[char]
    return tot
  }, 0)
}

const result = lines
  .map(line => deleteCompleteChunks(line))
  .filter(line => !isInvalid(line))
  .map(line => getScore(line))
  .sort((a, b) => a - b)

const middleIndex = Math.floor(result.length / 2)
console.log(result.slice(middleIndex, middleIndex + 1))
