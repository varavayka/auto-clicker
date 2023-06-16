import driver from '../lib/driver.mjs'
import e from '../lib/events.mjs'
import { Key, By } from 'selenium-webdriver'

function gifts() {
  e.once('gifts', async () => {
   
    setTimeout(async () => {
      await driver.executeScript('return document.location.href = "https://h5.touziapi.com/#/pages/missionHall/PanicBuying/PanicBuying"')
    },500)
   
    setTimeout(async () => {
      
      try{
        if(await driver.findElement(By.className('banner-footer-text-disabled'))) {
          e.emit('switch-account')
          console.log('Нельзя получить награду!')
          return
        } 


      }catch(err) {
        setTimeout(() => {
          setInterval(async () => {
            const buyNowButtonWrapper = await driver.findElement(By.className('banner'))
            try{
              const buyNowButton = await buyNowButtonWrapper.findElement(By.className('banner-footer-text-available')).click()
              setTimeout(async () => {
                try{
                  const modalWindowLucky = await  driver.findElement(By.className('luckly-money-content')) // модальное окно с кнопкой
                  const modalButton = await modalWindowLucky.findElement(By.className('luckly-money-footer-btn')).click() // сама кнопка  
                }catch(err) {
                  e.emit('switch-account')
                }
              
            },8000)
            }catch(err) {
              e.emit('switch-account')
            }
            
             
          },10000)
        },15000)
        
        
        
        // setTimeout(async() => {
        //   try{
            
            

        //   }catch(err) {
        //     e.emit('switch-account')
        //   }


        // },4000)
          

      }




    },1000)
    
   
   
  })
}
export default gifts







        

