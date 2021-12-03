const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const data = lines.reduce((result, line) => {
        result.push(line)
        return result
    }, []);

console.time('a')
const finalPosition = data.reduce((position, line) => {
  const [command, value] = line.split(' ')
  const val = Number(value)
  switch (command) {
    case 'forward':
      position.x += val
      position.y += position.aim * val
      break
    case 'down':
      position.aim += val
      break
    case 'up':
      position.aim -= val
      break
   }

  return position
}, {
  x: 0,
  y: 0,
  aim: 0,
})

console.log('finalPositon', finalPosition)
console.log('result', finalPosition.x * finalPosition.y)
console.timeEnd('a')
