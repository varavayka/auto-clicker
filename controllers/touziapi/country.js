const driver  = require('../../core/driver/driver')
const {By,Key,until} = require('selenium-webdriver')


const choiceCountry = async () => {
  try{
    await driver.sleep(500)
    await driver.findElement(By.className('login-form-item-right')).click()
    await driver.sleep(500)

    const bodyCountryBlock = await driver.findElement(By.className('uni-searchbar__box')) 
    await bodyCountryBlock.click()

    const searchInput = await driver.wait(until.elementLocated(By.xpath("//input[@type='search']")),30000,null,500)
    
    await searchInput.click()
    await searchInput.sendKeys('Russia')
    await driver.sleep(500)

    await searchInput.sendKeys(Key.RETURN)
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