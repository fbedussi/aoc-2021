const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const data = lines.reduce((result, line) => {
        result.push(Number(line))
        return result
    }, []);


const numberOfIncreasing = data.reduce((result, value, index, array) => {
  if (array[index - 1] && value > array[index - 1]) {
    result++
  }

  return result
}, 0)

console.log('numberOfIncreasing', numberOfIncreasing)
