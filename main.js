const {createReadStream} = require('fs')
const {resolve} = require('path')
const {By,until} = require('selenium-webdriver')
require('dotenv').config()
const handlers = require('./handlers/aliali/mainHandler')
const driver = require('./core/driver/driver')
const e = require('./core/events/events')


function main() {
  
  touzi(process.env.PHONE_NUMBER,process.env.PASSWORD)
    
  let count = 0
  e.on('switch-account', async () => {
    
    createReadStream(resolve('./','config','fakeCredentials.json'))
    .on('data',async buff => {
      count++
        const accounts = JSON.parse(buff.toString())
        await touzi(accounts[count].tel,accounts[count].password)
    })
    
  })
  
  async function touzi(phoneNumber,password) {
    await driver.sleep(1500)
    try {
      await driver.get('https://h5.touziapi.com/#/pages/setting/Login/Login')
      const BODY_CARD = await driver.wait(until.elementLocated(By.className('content-body-card')), 60000, undefined, 100)
      
      if(BODY_CARD) {
        await  handlers()
        e.emit('auth', phoneNumber,password)
      }
    } catch(err) {
      console.log(`Не удалось загрузить страницу авторизации! 
      причина:
      ${err.message}`)
    }
    
  }
}


main()

  
