const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
let fishes = lines[0].split(',').map(Number)
console.log(fishes)

for (let day = 0; day < 80; day++) {
  // console.log(day)
  let newFishes = []
  fishes = fishes.map(counter => {
    if (counter > 0) {
      return counter - 1
    }
    if (counter === 0) {
      newFishes.push(8)
      return 6
    }
  }).concat(newFishes)
}

console.log('result', fishes.length)
