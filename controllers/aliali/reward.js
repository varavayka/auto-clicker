const driver  = require('../../core/driver/driver')
const {By,key,until} = require('selenium-webdriver')


const reward = async (report) => {
  await driver.sleep(1700)
  await driver.executeScript('return document.location.href = "https://h5.touziapi.com/#/pages/profile/Record/Record"')

  try{

    const REWARD_PAGE = await driver.wait(until.elementLocated(By.xpath('//*[@id="app"]/uni-app/uni-page')),60000,null,100)
    
    if(REWARD_PAGE)
    await driver.sleep(2000)
    await REWARD_PAGE.findElement(By.id('categoryItemnav2')).click()
    await driver.sleep(1500)

    try{
      const NOT_RECEIVE = await driver.findElement(By.className('success'))
      
      if(NOT_RECEIVE) {
        report(false)
      }

    }catch(err) {
      const RECEIVE_BUTTON = await driver.wait(until.elementLocated(By.className(`receive`)),60000,null,100)
      
      if(RECEIVE_BUTTON) {
        await driver.sleep(500)
        await RECEIVE_BUTTON.click()
        await driver.sleep(1500)
        await report(true)
      }
      console.log(`
       ${err.message}
       Поймана ошибка во вложеном catch блоке получения награды(6$)
      `)
    }

  }catch(err) {
    report(false)
    console.log(`
     ${err.message}
     Поймана ошибка во внешнем catch блоке получения награды(6$)
    `)
  }

}

module.exports = reward

