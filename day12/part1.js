const fs = require('fs')

const inputTxt = fs.readFileSync('./input-test.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);

let paths = 0

function isValid(a,b, b1, visited) {
  return  a === b1 && (b.match(/[A-Z]/) || (b.match(/[a-z]/) && !visited.includes(b)))
}

function nextStep(currentSegment, currentPosition, segments, visited) {
  visited = [...new Set(visited.concat(currentSegment))]
  // console.log(visited)
  const nextSegments = segments.filter(([a, b]) => isValid(a,b,currentSegment[currentPosition], visited) || isValid(b,a,currentSegment[currentPosition], visited))
  nextSegments.forEach(segment => {
    const position = segment[0] === currentSegment[currentPosition]  ? 1 : 0
    if (segment[position].match(/[a-z]/) && visited.includes(segment[position]) ) {
      return
    }
    if (segment[position] === 'end') {
      paths++
      return
    }
    return nextStep(segment, segment[0] === currentSegment[currentPosition]  ? 1 : 0, segments, visited)
  })
}

const segments = lines.map(line => line.split('-'))
const startSegments = segments.filter((segment) => segment.some(point => point === 'start'))
startSegments.forEach(startSegment => nextStep(startSegment, startSegment[0] === 'start' ? 1 : 0, segments.filter(([a, b]) => a !== 'start' || b !== 'start'), []))

console.log('paths', paths)
