const fs = require('fs');

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const emptyLine = lines.findIndex(line => line.length === 0)
const coordinates = lines.slice(0,emptyLine).map(line => line.split(',').map(Number))
const instructions = lines.slice(emptyLine + 1).map(line => {
  if (line.includes('x')) {
    return {x: Number(line.split('=')[1])}
  }
  if (line.includes('y')) {
    return {y: Number(line.split('=')[1])}
  }
}).slice(0,1)

function foldY(coordinates, foldingLine) {
  return coordinates.map(([x,y]) => [x, y > foldingLine ? foldingLine - (y - foldingLine) : y])
}

function foldX(coordinates, foldingLine) {
  return coordinates.map(([x,y]) => [x > foldingLine ? foldingLine - (x - foldingLine) : x, y])
}

const result = instructions.reduce((coordinates, instruction) => {
  coordinates = instruction.y ? foldY(coordinates, instruction.y) : foldX(coordinates, instruction.x)

  return coordinates
}, coordinates)

const deduplicated = [...new Set(result.map(([x,y]) => `${x},${y}`))].map(line => line.split(',').map(Number))
const maxX = Math.max(...deduplicated.map(([x]) => x))
const maxY = Math.max(...deduplicated.map(([_,y]) => y))
const map = new Array(maxY + 1).fill(null).map(() => new Array(maxX + 1).fill('.'))
deduplicated.forEach(([x,y]) => map[y][x] = '#') 
console.table(map)
const numberOfPoints = deduplicated.length

console.log(numberOfPoints)
