const  { Builder, By, Browser, Key,until} = require('selenium-webdriver')
const  { createReadStream, createWriteStream, writeFile} = require('fs')
const  { EventEmitter } = require('events')
const  path = require('path')
const  { randomBytes } = require('crypto')
const e = new EventEmitter()

  let i = 0
  let j = 0
  let buff
  async function main () {
    createReadStream(path.resolve('./','config', 'test.json'))
    .on('data', buffer => {
      buff = buffer
    })
    .on('end', () => {
      console.log(buff)
      setInterval(async() => {
        j++
        await accountGenerator('https://invited.touziapi.com/?invited=W0VB6Q',JSON.parse(buff.toString())[j].password,JSON.parse(buff.toString())[j].tel,JSON.parse(buff.toString())[j].password)
        


      }, 15000);
    })
  }
  main ()
  

  // function generateCredentials() {
  //   const randomNum = Math.random(randomBytes(8))
  //   const tel = '963' + randomNum.toString().split('.')[1].split('').splice(0,7).join('')
  //   const password  = randomBytes(8).toString('hex')
  //   return {tel,password}
  // }
  
  
  // function createListCredentials(fileRecordCount) {
  //   const list = []
  //   while(fileRecordCount >= i) {
  //     list.push(generateCredentials())
  //     i++
  //   }
  //   const createFile = createWriteStream(path.resolve('./','config', 'fakeCredentials.json'))
  //   createFile.write(JSON.stringify(list))
    
  // }
  // e.on('registration', () => {
  //   main ()
  // })
 
  // e.on('createList', () => {
  //   createListCredentials(1000)

  //   setTimeout(() => e.emit('registration'),100)
  // })

  // e.emit('createList')



  
  
  

const driver = new Builder().forBrowser(Browser.CHROME).build()
async function accountGenerator(url,passwd,tel,confirmPassword) {
  
  await driver.get(url)

  try{
    
    const bodyCard = await driver.wait(until.elementsLocated(By.xpath('//input')),60000, undefined, 100)
    if(bodyCard) {
      
      
      bodyCard[0].click()
      bodyCard[0].sendKeys(tel)
      await driver.sleep(100)
      bodyCard[1].click()
      bodyCard[1].sendKeys('000')
      await driver.sleep(100)
      bodyCard[2].click()
      bodyCard[2].sendKeys(passwd)
      await driver.sleep(100)
      bodyCard[3].click()
      bodyCard[3].sendKeys(passwd)
      await driver.sleep(100)
      bodyCard[4].click()
      bodyCard[4].sendKeys(confirmPassword)
      await driver.sleep(100)
      await driver.findElement(By.className('login-form-item-right')).click()
      const bodyCountryBlock = driver.findElement(By.className('van-field__body'))
      await driver.sleep(300)
      await bodyCountryBlock.click()
      await driver.sleep(100)
      await bodyCountryBlock.findElement(By.xpath("//input[@type='search']"))
      .sendKeys('Russia',Key.RETURN)
      await driver.findElement(By.className('content-list-item'))
      .click()
      
      // await driver.sleep(10000)
      await driver.findElement(By.className('content-body-button')).click()
      
      const modalConfirmReg = await driver.wait(until.elementLocated(By.className('van-hairline--top van-dialog__footer')), 60000,null, 1000)
      await modalConfirmReg.click()
      
      // await driver.navigate().back()

      // bodyCard[0].clear()
      // bodyCard[2].clear()
      // const signInPage = await driver.wait(until.elementLocated(By.className('page')), 60000,null, 1000)
      // if(signInPage) 
      const originalWindow = await driver.getWindowHandle();
      await driver.wait(async () => (await driver.getAllWindowHandles()).length === 1,8000);
      const windows = await driver.getAllWindowHandles();
      windows.forEach(async handle => {
      if (handle !== originalWindow) {
        await driver.quit();
        
        await driver.findElement(By.className('ytp-large-play-button')).click()
        
        
      }
      })
      
    }
    
  }catch(err) {
    await driver.navigate().refresh()
    console.log(err.message)
  }
}






