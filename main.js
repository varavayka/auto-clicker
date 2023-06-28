const driver = require('./core/driver/driver')
const e = require('./core/events/events')
const {By,until} = require('selenium-webdriver')
const handlers = require('./handlers/touziapi/mainHandler')
// const {argv,exit, exitCode} = require('process')
const {createReadStream} = require('fs')
const {resolve} = require('path')
// const chrome = require('selenium-webdriver/chrome')
// resolve('./','config','fakeCredentials.json')
// JSON.parse(buff.toString())
// '9638727918','FmVWbMC5fazn3WA'
// '9636179504','40d16e2ee546b3ae'
  touzi('9637283069','4f85e1fba864c8f0')
  
let count = 0
e.on('switch-account', async () => {
  
  
  createReadStream(resolve('./','config','fakeCredentials.json'))
  .on('data',async buff => {
    count++
    const accounts = JSON.parse(buff.toString())
    // await driver.quit()
    console.log(await switchWindow())
    // setTimeout(async () => {
      await touzi(accounts[count].tel,accounts[count].password)
      console.log(count + 'успешных итераций')
    // },1500)
  })
  
})

async function touzi(phoneNumber,password) {
  await driver.sleep(1500)
  try {
    await driver.get('https://h5.touziapi.com/#/pages/setting/Login/Login')
    const bodyCard = await driver.wait(until.elementLocated(By.className('content-body-card')), 60000, undefined, 100)
    
    if(bodyCard) {
      await  handlers()
      e.emit('auth', phoneNumber,password)
    }
  } catch(err) {
    console.log(`Не удалось загрузить страницу авторизации! 
    причина:
    ${err.message}`)
  }
  
}

async function switchWindow() {
  const original = await driver.getWindowHandle()

  // return async function() {
  //   const allWindow = await driver.getAllWindowHandles()

  //   allWindow.forEach(async window => {
  //     if(original !== window) {
  //       if(allWindow.length === 1)
  //       await driver.switchTo().window(window)
  //     }
  //   })
  // }
  console.log(original)
}


