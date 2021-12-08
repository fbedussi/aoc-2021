const fs = require('fs')

const inputTxt = fs.readFileSync('./input-test.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
let fishes = lines[0].split(',').map(Number)
console.log(fishes)

const days = 80




const a = fishes.length + (fishes.length * days/9)
console.log('total', a + (a * days/7))
26984457539
10737418240
