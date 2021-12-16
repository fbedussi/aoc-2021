const fs = require('fs');

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const emptyLineIndex = lines.findIndex(line => line.length === 0)
const template = lines.slice(0,emptyLineIndex)[0]
const rules = lines.slice(emptyLineIndex + 1).map(line => line.split(' -> '))

const steps = 40

const rulesMap = rules.reduce((result, [matcher, insertion]) => {
  result[matcher] = insertion
  return result
}, {})

let tokenMap = {}
function insertOrIncrement(token, value = 1) {
  if (tokenMap[token] !== undefined) {
    tokenMap[token] += value
  } else {
    tokenMap[token] = value
  }
}

for (let i = 0; i < template.length - 1; i++) {
  const token = template.substring(i, i+2)
  insertOrIncrement(token)
} 

const frequencyMap = rules.reduce((result, [token, insertion]) => {
  token.split('').concat(insertion).forEach(char => {
    if (result[char] === undefined) {
      result[char] = template.split('').filter(c => c === char).length
    }
  })
  return result
}, {})


for (step = 1; step <= steps; step++) {
  const tokens = Object.keys(tokenMap)
  let updates = []
  tokens.forEach(token => {
    if (tokenMap[token] === 0) {
      return
    }
    const insertion = rulesMap[token]
    
    const newToken1 = token[0]+insertion
    const newToken2 = insertion+token[1]
    
    frequencyMap[insertion] += tokenMap[token]

    updates.push([newToken1, tokenMap[token]])
    updates.push([newToken2, tokenMap[token]])
    
    tokenMap[token] = 0
  })
  updates.forEach(([newToken, accourencies]) => {
    insertOrIncrement(newToken, accourencies)
  })
  console.log(step)
}

const sortedFrequencies = Object.entries(frequencyMap).sort(([char1, frequency1], [char2, frequency2]) => frequency2 - frequency1)

console.log('result', sortedFrequencies[0][1] - sortedFrequencies.at(-1)[1])
