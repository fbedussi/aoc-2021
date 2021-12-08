const fs = require('fs')

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);
const entries = lines.map(line => line.split(' | ').map(part => part.split(' ')))

const sortString = (str) => str.split('').sort().join('')

const decodeSignals = (signals) => {
  const code1 = sortString(signals.find(signal => signal.length === 2))
  const code7 = sortString(signals.find(signal => signal.length === 3))
  const code4 = sortString(signals.find(signal => signal.length === 4))
  const code8 = sortString(signals.find(signal => signal.length === 7))

  const topSegment = code7.split('').find(segment => !code1.includes(segment))
  const fourPlusSeven = [...new Set(code4.split('').concat(code7.split('')))]
  const code9 = signals.find(signal => signal.length === fourPlusSeven.length + 1 && fourPlusSeven.every(segment => signal.includes(segment)))
  const bottomSegment = code9.split('').find(segment => !fourPlusSeven.includes(segment))
  const eightMinusSeven = code8.split('').filter(segment => !code7.includes(segment))
  const eightMinusSevenPulsTopSegment = eightMinusSeven.concat(topSegment)
  const code6 = signals.find(signal => signal.length === eightMinusSevenPulsTopSegment.length + 1 && eightMinusSevenPulsTopSegment.every(segment => signal.includes(segment)))
  const topRightSegment = code8.split('').find(segment => !code6.includes(segment))
  const code5 = code9.split('').filter(segment => segment !== topRightSegment).join('')
  const eightMinusFive = code8.split('').filter(segment => !code5.includes(segment))
  const bottomLeftSegment = eightMinusFive.find(segment => segment != topRightSegment)
  const code2 = signals.find(signal => signal.length === 5 && [topSegment, bottomSegment, topRightSegment, bottomLeftSegment].every(segment => signal.includes(segment)))
  const middleSegment = code2.split('').find(segment => ![topSegment, bottomSegment, topRightSegment, bottomLeftSegment].includes(segment))
  const code0 = code8.split('').filter(segment => segment !== middleSegment).join('')
  const code3 = code1.split('').concat([topSegment, bottomSegment, middleSegment]).join('')
  const result = {
    [sortString(code0)]: '0',
    [code1]: '1',
    [sortString(code2)]: '2',
    [sortString(code3)]: '3',
    [code4]: '4',
    [sortString(code5)]: '5',
    [sortString(code6)]: '6',
    [code7]: '7',
    [code8]: '8',
    [sortString(code9)]: '9'
  }

  return result
}
const decodeOutput = (digitsCodes, output) => {
  const match = Object.entries(digitsCodes).find(([code]) => code === sortString(output))
  return match[1]
}

const decodeOutputs= (digitsCodes, outputs) => {
  const resultAsString = outputs.map(output => decodeOutput(digitsCodes, output)).join('')
  return Number(resultAsString)
}

const decoded = entries.map(([signals, outputs]) => {
  const digitsCodes = decodeSignals(signals)
  return decodeOutputs(digitsCodes, outputs)
})

const result = decoded.reduce((sum, number) => sum + number, 0)

console.log(result)
console.assert(result === 1040429)
