const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const map = lines.map(line => line.split('').map(cell => Number(cell)))

let lowPoints = []
for(let rowIndex = 0; rowIndex < map.length; rowIndex++) {
  for(let colIndex = 0; colIndex < map[rowIndex].length; colIndex++) {
    const prevRow = map[rowIndex - 1]
    const thisRow = map[rowIndex]
    const nextRow = map[rowIndex + 1]
    const adiacentCells = [prevRow && prevRow[colIndex], nextRow && nextRow[colIndex], thisRow[colIndex - 1], thisRow[colIndex + 1]].filter(x => x !== undefined)

    if (adiacentCells.every(cell => cell > thisRow[colIndex])) {
      lowPoints.push(thisRow[colIndex])
    }
  }
}

const result = lowPoints.reduce((result, point) => result + point + 1, 0)
console.log(result)
