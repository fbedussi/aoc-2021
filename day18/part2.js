const fs = require('fs');
const path = require('path/posix');

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);

const inputTxtTest = fs.readFileSync('./test2.txt', 'UTF-8')
const linesTest = inputTxtTest.split(/\r?\n/).flatMap(line => line.split(/\s+/)).map(coord => coord.split(',').map(Number));
const input = lines[0].split(': ')[1].split(', ').map(part => part.split('..').map(txt => txt.replace(/x=|y=/,'')).map(Number))

const targetMinX = input[0][0]
const targetMaxX = input[0][1]
const targetMinY = input[1][0]
const targetMaxY = input[1][1]

let rightStartingVel = []
const launch = (xVel,yVel) => {
  const startingXVel = xVel
  const startingYVel = yVel
  let x = 0
  let y = 0
  while(x < targetMaxX && y > targetMinY  ) {
    x += xVel
    y += yVel 
    yVel--
    xVel > 0 ? xVel-- : xVel < 0 ? xVel++ : xVel
    // console.log(x,y)
    const isInTarget = x >= targetMinX && x <= targetMaxX && y >= targetMinY && y <= targetMaxY
    if (isInTarget) {
      rightStartingVel.push([startingXVel, startingYVel])
    }
  }
}

for (let velX = 1; velX < 500; velX++) {
  for (let velY = -500; velY < 500; velY++) {
    launch(velX, velY)
  }
}

const deduplicated = [...new Set(rightStartingVel.map(([x,y]) => `${x},${y}`))] 
console.log('result', deduplicated.length)

