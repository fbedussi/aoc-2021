const fs = require('fs');
const path = require('path/posix');

const inputTxt = fs.readFileSync('./input.txt', 'UTF-8')
const lines = inputTxt.split(/\r?\n/);

const input = lines[0]

const hexToBinary = {
'0': '0000',
'1': '0001',
'2': '0010',
'3': '0011',
'4': '0100',
'5': '0101',
'6': '0110',
'7': '0111',
'8': '1000',
'9': '1001',
'A': '1010',
'B': '1011',
'C': '1100',
'D': '1101',
'E': '1110',
'F': '1111',
}

const binary = input.split('').map(char => hexToBinary[char]).join('')

const parsePacket = (packet, hierarchy) => {
  const version = parseInt(packet.substring(0,3), 2)
  const packetTypeId = parseInt(packet.substring(3,6), 2)
  let packetBody = packet.substring(6)
  if (packetTypeId === 4) {
    let group
    let bits = ''
    do {
      group = packetBody.substring(0,5)
      packetBody = packetBody.substring(5)
      bits += group.substring(1)
    } while (group[0] === '1') 
    const value = parseInt(bits, 2)
    hierarchy.push({type: packetTypeId, version, value})
    return packetBody
  } else {
    const lengthTypeId = packetBody[0]
    packetBody = packetBody.substring(1)
    const children = []
    hierarchy.push({type: packetTypeId, version, children})
    if (lengthTypeId === '0') {
      const subPackagesLength = parseInt(packetBody.substring(0,15),2)
      packetBody = packetBody.substring(15)
      let bodyToParse = packetBody.substring(0,subPackagesLength)
      packetBody = packetBody.substring(subPackagesLength)
      while (bodyToParse.length > 6) {
        bodyToParse = parsePacket(bodyToParse, children)
      }
      return packetBody
    } else {
      const numberOfSubpackages = parseInt(packetBody.substring(0,11),2)
      packetBody = packetBody.substring(11)
      for (let i = 0; i < numberOfSubpackages; i++) {
        packetBody = parsePacket(packetBody, children)
      }
      return packetBody
    }
  }
}

let hierarchy = []
parsePacket(binary, hierarchy)

const processPacket = ({type, value, children}) => {
  switch (type) {
    case 0: {
      const c = children.map(child => child.value ? child.value : processPacket(child))
      const res = c.reduce((sum, value) => sum + value, 0)
      return res
    }
    case 1:
      return children.map(child => child.value ? child.value : processPacket(child)).reduce((prod, value) => prod * value, 1)
    case 2:
      return Math.min(...children.map(child => child.value ? child.value : processPacket(child)))
    case 3:
      return Math.max(...children.map(child => child.value ? child.value : processPacket(child)))
    case 4:
      return value
    case 5: {
      return processPacket(children[0]) > processPacket(children[1]) ? 1 : 0
    }
   case 6: {
    return processPacket(children[0]) < processPacket(children[1]) ? 1 : 0
   }
    case 7: {
      return processPacket(children[0]) === processPacket(children[1]) ? 1 : 0
    }
  }
}

const result = processPacket(hierarchy[0])
console.log(result)
