const driver  = require('../../core/driver/driver')
const {By,Key,until} = require('selenium-webdriver')


const choiceCountry = async () => {
  try{
    await driver.sleep(500)
    await driver.findElement(By.className('login-form-item-right')).click()
    await driver.sleep(500)

    const BODY_COUNTRY_BLOCK = await driver.findElement(By.className('uni-searchbar__box')) 
    await BODY_COUNTRY_BLOCK.click()

    const SEARCH_INPUT = await driver.wait(until.elementLocated(By.xpath("//input[@type='search']")),30000,null,500)
    
    await SEARCH_INPUT.click()
    await SEARCH_INPUT.sendKeys('Russia')
    await driver.sleep(500)

    await SEARCH_INPUT.sendKeys(Key.RETURN)
    await driver.sleep(500)
    
    await driver.findElement(By.className('popup-content-list-item')).click()
  }catch(err) {
    console.log(`
      ${err.message}
      Поймана ошибка в контроллере выбора региона!
    `)
  }
  
}
module.exports = choiceCountry