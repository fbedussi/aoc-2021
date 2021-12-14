const fs = require('fs');

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const emptyLineIndex = lines.findIndex(line => line.length === 0)
const template = lines.slice(0,emptyLineIndex)[0]
const rules = lines.slice(emptyLineIndex + 1).map(line => line.split(' -> '))

const steps = 10

let result = template

function findMatches() {
  return rules.filter(([matcher]) => {
    const regExp = new RegExp(matcher)
    return regExp.test(result)
  })
}

function  applyMatches(rules) {
  const rulesMap = rules.reduce((result, [matcher, insertion]) => {
    result[matcher] = `${matcher[0]}${insertion}${matcher[1]}`
    return result
  }, {})
  let res = result
  for (let i = 0; i < res.length; i++) {
    const a = res.substring(i, i+2)
    const replacement = rulesMap[a]
    if (replacement) {
      res = res.substring(0,i) + replacement + res.substring(i + 2)
      i++
    }
  } 

  return res
}

console.log('template', result)
for (step = 1; step <= steps; step++) {
  const matchingRules = findMatches()
  result = applyMatches(matchingRules)
}

const sortedFrequencies = Object.entries(result.split('').reduce((result, char) => {
  if (result[char]) {
    result[char]++
  } else {
    result[char] = 1
  }
  return result
}, {})).sort(([char1, frequency1], [char2, frequency2]) => frequency2 - frequency1)

console.log('result', sortedFrequencies[0][1] - sortedFrequencies.at(-1)[1])
