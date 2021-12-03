const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const data = lines.reduce((result, line) => {
        result.push(line)
        return result
    }, []);


const bitFrequency = data.reduce((result, line) => {
  const bits = line.split('')
  bits.forEach((bit, index) => {
    result[index][bit === '0' ? 0 : 1]++
  })
  return result
}, new Array(data[0].length).fill(null).map(() => ([0,0])))

const mostCommonBits = parseInt(bitFrequency.map(bits => bits[0] > bits[1] ? '0' : '1').join(''), 2)
const leastCommonBits = parseInt(bitFrequency.map(bits => bits[0] < bits[1] ? '0' : '1').join(''), 2)
const result = mostCommonBits * leastCommonBits

console.log('mostCommonBits', mostCommonBits)
console.log('leastCommonBits', leastCommonBits)
console.log('result', result)
