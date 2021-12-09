const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const map = lines.map(line => line.split('').map(cell => Number(cell)))

const calculateBasin = (rowIndex, colIndex, basin = [{rowIndex, colIndex, value: map[rowIndex][colIndex]}]) => {
  const adiacentCells = []
    .concat([{rowIndex: rowIndex - 1, colIndex: colIndex}])
    .concat([{rowIndex: rowIndex, colIndex: colIndex - 1}, {rowIndex: rowIndex, colIndex: colIndex + 1}])
    .concat([{rowIndex: rowIndex + 1, colIndex: colIndex}])
    .filter(({rowIndex, colIndex}) => rowIndex >=0 && colIndex >= 0 && rowIndex < map.length && colIndex < map[0].length)

  adiacentCells.forEach(cell => {
    if (map[cell.rowIndex][cell.colIndex] > map[rowIndex][colIndex] && map[cell.rowIndex][cell.colIndex] < 9 && !basin.find(savedCell => cell.rowIndex === savedCell.rowIndex && cell.colIndex === savedCell.colIndex)) {
      basin.push(cell)
      calculateBasin(cell.rowIndex, cell.colIndex, basin)
    }
  })
  return basin
}

let lowPoints = []
let basins = []
for(let rowIndex = 0; rowIndex < map.length; rowIndex++) {
  for(let colIndex = 0; colIndex < map[rowIndex].length; colIndex++) {
    const prevRow = map[rowIndex - 1]
    const thisRow = map[rowIndex]
    const nextRow = map[rowIndex + 1]
    const adiacentCells = [prevRow && prevRow[colIndex], nextRow && nextRow[colIndex], thisRow[colIndex - 1], thisRow[colIndex + 1]].filter(x => x !== undefined)

    if (adiacentCells.every(cell => cell > thisRow[colIndex])) {
      lowPoints.push(thisRow[colIndex])
      basins.push(calculateBasin(rowIndex, colIndex))
    }
  }
}

const top3Basins = basins.sort((b1, b2) => b2.length - b1.length).slice(0,3)
const result = top3Basins.reduce((tot, basin) => {
  return tot * basin.length
}, 1)
console.log(result)
