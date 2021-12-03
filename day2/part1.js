const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const data = lines.reduce((result, line) => {
        result.push(line)
        return result
    }, []);


const finalPosition = data.reduce((position, line) => {
  const [command, value] = line.split(' ')
  switch (command) {
    case 'forward':
      position.x += Number(value)
      break
    case 'down':
      position.y += Number(value)
      break
    case 'up':
      position.y -= Number(value)
      break
   }

  return position
}, {
  x: 0,
  y: 0,
})

console.log('finalPositon', finalPosition)
console.log('result', finalPosition.x * finalPosition.y)
