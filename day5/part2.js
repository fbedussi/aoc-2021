const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
let coordinates = lines.map(line => line.split(' -> ').map(point => point.split(',').map(Number)))

const colNumber = Math.max(...coordinates.flatMap(coordinate => coordinate.flatMap(([x,y]) => y)))
const rowNumber = Math.max(...coordinates.flatMap(coordinate => coordinate.flatMap(([x,y]) => x)))

const row = new Array(colNumber + 1).fill(0)
const field = new Array(rowNumber + 1).fill(0).map(() => [...row])

coordinates.forEach(([[x1,y1], [x2,y2]]) => {
    let x = x1
    let y = y1
    field[y][x]++
    while(x !== x2 || y  !== y2) {
      x = x === x2 ? x : x1 < x2 ? x + 1 : x - 1
      y = y === y2 ? y : y1 < y2 ? y + 1 : y - 1
      field[y][x]++
    }
})

const result = field.flatMap(row => row).reduce((result, cell) => cell > 1 ? result + 1 : result, 0) 
console.log('result', result)
//22364
