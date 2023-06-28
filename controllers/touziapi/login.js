const driver  = require('../../core/driver/driver')
const {By,key,until} = require('selenium-webdriver')
const login = async () => {
  try{
    await driver.findElement(By.className("content-body-button")).click()
  } catch(err) {
    console.log(err.message)
    // await driver.navigate().refresh()
    // await driver.sleep(1000)
  }
  
  
  
}

module.exports = login