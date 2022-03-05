const fs = require('fs');
const path = require('path/posix');

const inputTxt = fs.readFileSync('./input-test.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);

const add = (number1, number2) => {
  console.log(number1, ' + ', number2)
  return `[${number1},${number2}]`
}

const reduce = (number) => {
  const firstNumberGreatherThanTen = /(.*?)(\d\d\d?)(.*)/

  let index = 0
  let numberOfOpenBrackets = 0
  while (numberOfOpenBrackets < 5 && index < number.length) {
    if (number[index] === '[') {
      numberOfOpenBrackets++
    }
    if (number[index] === ']') {
      numberOfOpenBrackets--
    }
    index++
  }

  if (numberOfOpenBrackets === 5) {
    const head = number.substring(0,index - 1)
    const remaining = number.substring(index - 1)
    number = remaining.replace(/(\[(\d+),(\d+)\])(.*)/, (match, explodingGroup, explodingGroupLeftNumber, explodingGroupRightNumber, tail) => {
      const newHead = head.split('').reverse().join('').replace(/(.*)(\d{1,4})(.*)/, (match, head, number, tail) => {
        const result = `${head}${(Number(number.split('').reverse().join(''))+Number(explodingGroupLeftNumber)).toString().split('').reverse().join('')}${tail}`.split('').reverse().join('')
        console.log(result)
        return result
      })
      const newTail = tail?.replace(/([^\d]*)(\d+)(.*)/, (match, head, number, tail) => {
        return `${head}${Number(number) + Number(explodingGroupRightNumber)}${tail}`
      })
      const result = `${newHead}0${newTail[0] === '[' ? ',' : ''}${newTail}`
      return result
    })
    return reduce(number)
  }  else if (firstNumberGreatherThanTen.test(number))  {
    number = number.replace(firstNumberGreatherThanTen, (match, head, numberGreaterThanTen, tail) => {
      const n = Number(numberGreaterThanTen)
      return `${head}[${Math.floor(n/2)},${Math.ceil(n/2)}]${tail}`
    })
    return reduce(number)
  }
  
  console.log('= ', number)
  return number
}

const result = lines.reduce((result, number) => reduce(add(result, number)))

console.log(result)
