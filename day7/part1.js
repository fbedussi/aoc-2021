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

// function moda(values) {
//   const valuesMap = values.reduce((result, value) => {
//     result[value] ? result[value]++ : result[value] = 1
//     return result
//   }, {})
//   console.log(valuesMap)

//   const sorted = Object.entries(valuesMap).sort(([val1, freq1], [val2, freq2]) => freq2 - freq1)
//   console.log(sorted)
//   return sorted[0][0]
// }

function average(values) {
  return values.reduce((sum, val) => sum + val, 0)/values.length
}

const optimalPosition = median(positions)
const result = positions.reduce((tot, pos) => {
  tot += Math.abs(pos - optimalPosition)
  return tot
}, 0)
console.log(result)
