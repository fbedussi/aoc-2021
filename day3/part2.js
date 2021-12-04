const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const data = lines.reduce((result, line) => {
        result.push(line)
        return result
    }, []);

function calculate(data, comparingFn) {
  let result = data
  let bitPosition = 0
  while(result.length > 1 && bitPosition < data[0].length) {
    const sorted = result.sort((line1, line2) => Number(line1[bitPosition]) - Number(line2[bitPosition]))
    const index = sorted.findIndex((line, index, lines) => lines[index + 1] && (lines[index + 1][bitPosition] !== line[bitPosition])) + 1
    const zeroes = sorted.slice(0, index)
    const ones = sorted.slice(index)
    
    result = comparingFn(zeroes, ones)
    bitPosition++
  }
  return result
}
const oxygen = calculate(data, (zeroes, ones) => zeroes.length === ones.length || ones.length > zeroes.length ?  ones : zeroes)
const co2 = calculate(data, (zeroes, ones) => zeroes.length === ones.length || ones.length > zeroes.length ?  zeroes : ones)
console.log(oxygen, co2)
console.log('result', parseInt(oxygen[0], 2) * parseInt(co2[0], 2))
//1370737
