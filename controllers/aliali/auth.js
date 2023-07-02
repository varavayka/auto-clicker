const driver  = require('../../core/driver/driver')
const {By,until} = require('selenium-webdriver')

const auth = async (phoneNumber, password) => {

  try{
   const INPUT_AUTH = await driver.wait(until.elementsLocated(By.xpath('//input')),60000, undefined, 100) 
   
   driver.sleep(500)
   INPUT_AUTH[0].click()
   INPUT_AUTH[0].clear()
   INPUT_AUTH[0].sendKeys(phoneNumber)
   driver.sleep(500)
   INPUT_AUTH[1].click()
   INPUT_AUTH[1].clear()
   INPUT_AUTH[1].sendKeys(password)
   
  }catch(err) {
   console.log(`
    ${err.message}
    Ошибка в модуле авторизации!
   `)
  }

}

module.exports = auth