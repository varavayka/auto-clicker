const e = require('../../core/events/events')
const auth = require('../../controllers/aliali/auth')
const country = require('../../controllers/aliali/country')
const gifts = require('../../controllers/aliali/gifts')
const reward = require('../../controllers/aliali/reward')
const login = require('../../controllers/aliali/login')

 function main() {
  
  e.once('auth', async (phoneNumber,password) => {
    await auth(phoneNumber,password)
    e.emit('country')
  })

  e.once('country', async () => {
    await country()
    e.emit('login')
  })

  e.once('login', async () => {
    await login()
    e.emit('reward')
  })

  e.once('reward', async () =>  await reward(cb => 

  cb ? e.emit('gifts') : e.emit('gifts')))

  e.once('gifts', async () => await gifts())

}


module.exports = main