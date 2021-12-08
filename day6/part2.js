const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
let fishes = lines[0].split(',').map(Number)

const days = 256
const calculateDescendands = (input) => {
   const deduplicatedInput = Object.entries(input.reduce((result, counter) => {
    result[counter] ? result[counter]++ : result[counter] = 1 
    return result
  }, {}))
  let fishes = deduplicatedInput.map(([value, occurencies]) => ({
    number: occurencies,
    nextReproductionDay:  Number(value) + 1
  }))
  for (let day = 1; day <= days; day++) {
    for (let i = 0; i < fishes.length; i++) {
      if (fishes[i].nextReproductionDay === day) {
        const newGenerationNexDayOfReproduction = day + 9
        const fishesThatReproduceTheSameDay = fishes.find(({nextReproductionDay}) => nextReproductionDay === newGenerationNexDayOfReproduction)
        if (fishesThatReproduceTheSameDay) {
          fishesThatReproduceTheSameDay.number += fishes[i].number
        } else {
          fishes.push({
            number: fishes[i].number,
            nextReproductionDay: newGenerationNexDayOfReproduction
          })
        }
        const thisGenerationNextReproductionDay = day + 7
        const fishesThatReproduceTheSameDay2 = fishes.find(({nextReproductionDay}) => nextReproductionDay === thisGenerationNextReproductionDay)
        if (fishesThatReproduceTheSameDay2) {
          fishesThatReproduceTheSameDay2.number += fishes[i].number
          fishes = fishes.slice(0, i).concat(fishes.slice(i+1))
        } else {
          fishes[i].nextReproductionDay = thisGenerationNextReproductionDay
        }
      }
    }
  }
  return fishes.reduce((tot, {number}) => tot + number, 0)
}
const result = calculateDescendands(fishes)

console.log('result', result)
