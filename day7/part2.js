const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
let positions = lines[0].split(',').map(Number)

function median(values){
  if(values.length ===0) throw new Error("No inputs");

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);
  
  if (values.length % 2)
    return values[half];
  
  return (values[half - 1] + values[half]) / 2.0;
}

const calculateSingleConsumption = delta => {
  let tot = delta
  while(delta > 0) {
    delta--
    tot += delta
  }
  return tot
}

const calculateConsumption = finalPosition => positions.reduce((tot, pos) => {
  tot += calculateSingleConsumption(Math.abs(pos - finalPosition))
  return tot
}, 0)

let optimalPosition = median(positions)
let newResult = calculateConsumption(optimalPosition)
let oldResult
do {
  oldResult = newResult
  optimalPosition++
  newResult = calculateConsumption(optimalPosition)
} while (newResult < oldResult)
console.log(oldResult, --optimalPosition)
