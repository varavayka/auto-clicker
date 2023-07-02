const driver  = require('../../core/driver/driver')
const {By} = require('selenium-webdriver')
const login = async () => {
  try{
    await driver.findElement(By.className("content-body-button")).click()
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = login