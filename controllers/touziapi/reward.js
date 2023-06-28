const driver  = require('../../core/driver/driver')
const {By,key,until} = require('selenium-webdriver')


const reward = async (report) => {
  await driver.sleep(1700)
  await driver.executeScript('return document.location.href = "https://h5.touziapi.com/#/pages/profile/Record/Record"')

  try{

    const rewardPage = await driver.wait(until.elementLocated(By.xpath('//*[@id="app"]/uni-app/uni-page')),60000,null,100)
    
    if(rewardPage)
    await driver.sleep(2000)
    await rewardPage.findElement(By.id('categoryItemnav2')).click()
    await driver.sleep(1500)

    try{
      const notReceiveButton = await driver.findElement(By.className('success'))
      if(notReceiveButton) {
        report(false)
      }

    }catch(err) {
      const receiveButton = await driver.wait(until.elementLocated(By.className(`receive`)),60000,null,100)
      
      if(receiveButton) {
        await driver.sleep(500)
        await receiveButton.click()
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

