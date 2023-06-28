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
  
 const intervalID =  setInterval(async () => {

    try {
      const targetPage = await driver.wait(until.elementLocated(By.className('rebate-card')),60000, undefined, 500)
  
      if(targetPage) {
        try {
          const numberOfGiftsReceived = await driver.wait(until.elementLocated(By.xpath('//*[@id="app"]/uni-app/uni-page/uni-page-wrapper/uni-page-body/uni-view/uni-view[5]/uni-view[2]/uni-view/uni-view[3]/uni-view/uni-text[2]/span')),30000,null,100).getText()
          
          if(+numberOfGiftsReceived === 20) {
            e.emit('switch-account')
            console.log('Возможно переключить аккаунт')
            clearInterval(intervalID)
            // || await driver.findElement(By.className('banner-footer-text-disabled'))
          } else {
            throw new Error('true')
          }

          


        } catch(err) {
          if(err.message === 'true') {
            const buyNowButton = await driver.wait(until.elementLocated(By.className('banner-footer-text-available'),15000,null,200))
            await buyNowButton.click()
        
            await driver.sleep(500)
            const modalWindowLucky = await driver.wait(until.elementLocated(By.className('luckly-money-content')),15000, null, 200)
            
            if(modalWindowLucky) {
              await driver.sleep(700)
              await modalWindowLucky.findElement(By.className('luckly-money-footer-btn')).click() 
              
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
      // await driver.navigate().refresh() // при ошибке в блоке , страница будет перезагружена и по интервалу выполнение кода начнется заново, поможет предотвратить сетевые сбои или проблемы с долгой загрузкой компонентов страницы
      // await driver.sleep(2000)
    }
  },8000)
}

module.exports = gifts