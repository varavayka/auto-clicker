const driver  = require('../../core/driver/driver')
const {By,key,until} = require('selenium-webdriver')

const auth = async (phoneNumber, password) => {

  try{
   const inputsAuth = await driver.wait(until.elementsLocated(By.xpath('//input')),60000, undefined, 100) 
   
   driver.sleep(500)
   inputsAuth[0].click()
   inputsAuth[0].clear()
   inputsAuth[0].sendKeys(phoneNumber)
   driver.sleep(500)
   inputsAuth[1].click()
   inputsAuth[1].clear()
   inputsAuth[1].sendKeys(password)
   
  }catch(err) {
   console.log(`
    ${err.message}
    Ошибка в модуле авторизации!
   `)
  }

}

module.exports = auth