const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const coordinates = lines.map(line => line.split(' -> ').map(point => point.split(',').map(Number)))

const colNumber = Math.max(...coordinates.flatMap(coordinate => coordinate.flatMap(([x,y]) => y)))
const rowNumber = Math.max(...coordinates.flatMap(coordinate => coordinate.flatMap(([x,y]) => x)))

const row = new Array(colNumber + 1).fill(0)
const field = new Array(rowNumber + 1).fill(0).map(() => [...row])

coordinates.forEach(([[x1,y1], [x2,y2]]) => {
  if (x1 === x2 || y1 === y2) {
    const startX = Math.min(x1, x2)
    const endX = Math.max(x1, x2)
    const startY = Math.min(y1, y2)
    const endY = Math.max(y1, y2)
    console.log(startX, endX, startY, endY)
    for(let x = startX; x <= endX; x++) {
      for(let y = startY; y <= endY; y++) {
        field[y][x]++
      }
    }
  }
})

const result = field.flatMap(row => row).reduce((result, cell) => cell > 1 ? result + 1 : result, 0) 
console.log('result', result)
