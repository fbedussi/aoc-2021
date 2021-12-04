const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const numbers = lines[0].split(',').map(n => Number(n))
console.log('numbers', numbers)

const boards = lines.slice(1).reduce((result, line) => {
  if (!line.length) {
    result.push([])
  } else {
    result[result.length - 1].push(line.trim().replace(/  /g, ' ').split(' ').map(n => Number(n)))
  }
  return result
}, [])

function calculateResult(board, number) {
  won = true
  const sum = board.flatMap(rows => rows).reduce((sum, cell) => {
    if (cell !== null) {
      sum += cell
    }
    return sum
  }, 0)
  const result = sum * number
  console.log('result', result)
}

let numbersIndex = 0
let won = false
while (!won && numbersIndex < numbers.length) {
  const number = numbers[numbersIndex]
  // console.log('number', number)
  let boardsIndex = 0
  while (!won && boardsIndex < boards.length) {
    let board = boards[boardsIndex]
    // console.log('board before', board)
    board = board.map(row =>  row.map(cell => cell === number ? null : cell))
    // console.log('board after', board)
    boards[boardsIndex] = board
    
    const completeRow = board.find(row => row.every(cell => cell === null))
    if (completeRow) {
      calculateResult(board, number)
      break
    }
    
    for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
      const column = [board[0][colIndex], board[1][colIndex], board[2][colIndex], board[3][colIndex], board[4][colIndex]]
      const completeColumn = column.every(cell => cell === null)
      if (completeColumn) {
        calculateResult(board, number)
        break
      }
    }
    boardsIndex++
  }
  numbersIndex++
}
// console.log('tables', boards)

