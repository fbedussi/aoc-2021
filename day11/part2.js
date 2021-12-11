const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);

const grid = lines.map(line => line.split('').map(Number))
const flashed = new Array(grid.length).fill(0).map(line => line = new Array(grid[0].length).fill(false))
let numberOfFlash = 0

function add1() {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for(let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      grid[rowIndex][colIndex]++
    }
  }
}

function flash({rowIndex, colIndex}) {
  if (grid[rowIndex][colIndex] > 9 && !flashed[rowIndex][colIndex]) {
    numberOfFlash++
    flashed[rowIndex][colIndex] = true
    const adiacentCells = [
      {rowIndex: rowIndex - 1, colIndex: colIndex - 1}, {rowIndex: rowIndex - 1, colIndex}, {rowIndex: rowIndex - 1, colIndex: colIndex + 1},
      {rowIndex, colIndex: colIndex - 1}, {rowIndex, colIndex: colIndex + 1},
      {rowIndex: rowIndex + 1, colIndex: colIndex - 1}, {rowIndex: rowIndex + 1, colIndex}, {rowIndex: rowIndex + 1, colIndex: colIndex + 1},
    ].filter(({rowIndex, colIndex}) => rowIndex >= 0 && rowIndex < grid.length && colIndex >= 0 && colIndex < grid[0].length)
    adiacentCells.forEach(({rowIndex, colIndex}) => {
      grid[rowIndex][colIndex]++
    })
    adiacentCells.forEach(({rowIndex, colIndex}) => {
      flash({rowIndex, colIndex})
    })
  }
}

function resetFlashed() {
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for(let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      if (grid[rowIndex][colIndex] > 9) {
        grid[rowIndex][colIndex] = 0
        flashed[rowIndex][colIndex] = false
      } 
    }
  }
}

let step = 0
while (grid.some(row => row.some(cell => cell !== 0))) {
  step++
  add1()
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for(let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      flash({colIndex, rowIndex})
    }
  }
  resetFlashed()
}

console.log('step', step)
console.table(grid)
