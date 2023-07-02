const driver  = require('../../core/driver/driver')
const {By,key,until} = require('selenium-webdriver')
const e = require('../../core/events/events')

const gifts = async () => {

  try {
    await driver.sleep(1500)
    await driver.executeScript('return document.location.href = "https://h5.touziapi.com/#/pages/missionHall/PanicBuying/PanicBuying"')
  } catch(err) {
    console.log(`
      ${err.message}
      Поймана ошибка в блоке catch редиректа на получение Gifts
    `)
  }
  
 const INTERVAL_ID =  setInterval(async () => {

    try {
      const TARGET_PAGE = await driver.wait(until.elementLocated(By.className('rebate-card')),60000, undefined, 500)
  
      if(TARGET_PAGE) {
        try {
          
          const NUMBER_OF_GIFTS_RECEIVED = await driver.wait(until.elementLocated(By.xpath('//*[@id="app"]/uni-app/uni-page/uni-page-wrapper/uni-page-body/uni-view/uni-view[5]/uni-view[2]/uni-view/uni-view[3]/uni-view/uni-text[2]/span')),30000,null,100).getText()
          
          if(+NUMBER_OF_GIFTS_RECEIVED === 20) {

            e.emit('switch-account')
            console.log('Возможно переключить аккаунт')
            clearInterval(INTERVAL_ID)

          } else {

            throw new Error('true')

          }

        } catch(err) {

          if(err.message === 'true') {
            const BUY_NOW_BUTTON = await driver.wait(until.elementLocated(By.className('banner-footer-text-available'),15000,null,200))
            await BUY_NOW_BUTTON.click()
        
            await driver.sleep(500)
            const MODAL_WINDOW_LUCKY = await driver.wait(until.elementLocated(By.className('luckly-money-content')),15000, null, 200)
            
            if(MODAL_WINDOW_LUCKY) {
              await driver.sleep(700)
              await MODAL_WINDOW_LUCKY.findElement(By.className('luckly-money-footer-btn')).click() 
              
            }
          } else {
            console.log(err.message)
          }
          
        }
  
      }
    
    } catch(err) {

      console.log(`
        ${err.message}
        Отловлена ошибка в блоке catch целевой страницы!
      `)

    }
  },8000)
}

module.exports = gifts