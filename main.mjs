import { createReadStream, createWriteStream } from 'fs'
import {resolve} from 'path'
import authorization from './modules/authorization.mjs'
import country from './modules/choiceCountry.mjs'
// import reward from './checkReward.mjs'
import gifts from './modules/getGifts.mjs'
import login from './modules/login.mjs'

import driver from './lib/driver.mjs'
import e from './lib/events.mjs'


let count = 0

async function main(url,phoneNumber,passwd) {
  
  authorization()
  country()
  gifts()
  login()

  await driver.get(url)

  setTimeout(() => e.emit('auth', phoneNumber,passwd),1500)
  setTimeout(() => e.emit('country'),1800)
  setTimeout(() => e.emit('login'),4000)
  setTimeout(() => e.emit('gifts'),5000)

  
}
main('https://h5.touziapi.com/#/pages/setting/Login/Login','9638727918','FmVWbMC5fazn3WA')

e.on('switch-account', async () => {
  count++
  createReadStream(resolve('./','config', 'account.json'))
  .on('data',buffer => {
    const accountList = JSON.parse(buffer.toString())
    setTimeout(async () => {
      try{
        await main('https://h5.touziapi.com/#/pages/setting/Login/Login',accountList[count].tel,accountList[count].password)
        
      }catch(err) {
        console.log('Аккаунты закончились')
        await driver.quit()
      }
    },5000)
  })
})