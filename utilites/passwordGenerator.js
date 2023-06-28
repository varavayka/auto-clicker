const {randomBytes} = require('crypto')


function passGen(sizeByte) {
  
  return randomBytes(sizeByte).toString('hex').split('').slice(0,15).join('')
}

console.log(passGen(32))