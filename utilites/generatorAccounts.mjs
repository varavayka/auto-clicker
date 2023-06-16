import { Builder, By, Browser, Key } from 'selenium-webdriver'
import { createReadStream, createWriteStream } from 'fs'
import { EventEmitter } from 'events'
import path from 'path'
import { randomBytes } from 'crypto'
const e = new EventEmitter()


let i = 0
function generateCredentials() {
  const randomNum = Math.random(randomBytes(8))
  const tel = '963' + randomNum.toString().split('.')[1].split('').splice(0,7).join('')
  const password  = randomBytes(8).toString('hex')
  return {tel,password}
}


function createListCredentials(fileRecordCount) {
  const list = []
  while(fileRecordCount >= i) {
    list.push(generateCredentials())
    i++
  }
  const createFile = createWriteStream(path.resolve('./','config', 'fakeCredentials.json'))
  createFile.write(JSON.stringify(list))
  
}
createListCredentials(10)


createReadStream(path.resolve('./','config', 'fakeCredentials.json'))
.on('data', (buffer) => {
  const listAccount = JSON.parse(buffer.toString())
  let count = 0
  setInterval(() => {
    generator('https://h5.touziapi.com/#/pages/setting/Login/Login',listAccount[count].tel,listAccount[count].password,listAccount[count].tel)
  },20000)
})
async function generator(url,password,tel,confirmPassword) {
  const driver = await new Builder().forBrowser(Browser.CHROME).build()
  await driver.get(url)

  setTimeout(async () => {
    await driver.findElement(By.className('content-body-title-text')).click()

    setTimeout(async () => {
      await driver.findElement(By.xpath('//input[@type="number"]')).click()
      await driver.findElement(By.xpath('//input[@type="number"]')).sendKeys(tel)
    },1000)

  },2000)
}

