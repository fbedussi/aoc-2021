const fs = require('fs');
const path = require('path/posix');

const inputTxt = fs.readFileSync('./input-test.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const map = lines.map(line => line.split('').map(Number))

function calculatePaths([rowIndex, colIndex], visited) {
  const nextCells = [
    [rowIndex - 1, colIndex],
    [rowIndex + 1, colIndex],
    [rowIndex, colIndex - 1], [rowIndex, colIndex + 1],
  ].filter(([row, col]) => row >= 0 && col >= 0 && row < map.length && col < map[row].length && !visited.find(([[r,c]]) => r === row && c === col))

  const endCell = nextCells.find(([row, col]) => row === map.length - 1 && col === map[map.length - 1].length - 1 )

  if (endCell) {
    const pathValue = visited.reduce((tot, [_, cell]) => tot + cell, map[endCell[0]][endCell[1]])
    console.log(visited)
    pathValues.push(pathValue)
  } else {
    nextCells.forEach(([row, col]) => {
      console.log(row, col)
      visited = [...visited, [[row,col], map[row][col]]]
      calculatePaths([row, col], visited)
    })
  }
}

let pathValues = []
calculatePaths([0, 0], [[[0,0], 0]])  

pathValues.sort((a,b) => a- b)

const result = pathValues[0]

console.log('result', result)
