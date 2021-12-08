const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const entries = lines.map(line => line.split(' | ').map(part => part.split(' ')))

const outputs = entries.map(entry => entry[1])
const allOutputs = outputs.flatMap(output => output)

const result = allOutputs.filter(digit => [2,3,4,7].includes(digit.length)).length
console.log(result)
