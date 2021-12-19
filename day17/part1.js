const fs = require('fs');
const path = require('path/posix');

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);

const input = lines[0].split(': ')[1].split(', ').map(part => part.split('..').map(txt => txt.replace(/x=|y=/,'')).map(Number))

const targetMinX = input[0][0]
const targetMaxX = input[0][1]
const targetMinY = input[1][0]
const targetMaxY = input[1][1]

let maxYHistory = []
const launch = (xVel,yVel) => {
  let x = 0
  let y = 0
  let yHistory = [y]
  while(x < targetMaxX && y > targetMaxY  ) {
    x += xVel
    y += yVel 
    yVel--
    yHistory.push(y)
    xVel > 0 ? xVel-- : xVel < 0 ? xVel++ : xVel
    // console.log(x,y)
    const isInTarget = x >= targetMinX && x <= targetMaxX && y >= targetMinY && y <= targetMaxY
    if (isInTarget) {
      maxYHistory.push(Math.max(...yHistory))
    }
  }
}

for (let velX = 1; velX < 80; velX++) {
  for (let velY = 1; velY < 100; velY++) {
    launch(velX, velY)
  }
}

console.log('result', Math.max(...maxYHistory))
//2628
