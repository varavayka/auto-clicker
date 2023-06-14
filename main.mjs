import { Builder, By, Browser, Key } from 'selenium-webdriver'
import { createReadStream, createWriteStream } from 'fs'
import { EventEmitter } from 'events'
import path from 'path'

let i = 0
let j = 0
createReadStream(path.resolve('./','config', 'account.json'))
.on('data', async buffer => {
  const accountList = JSON.parse(buffer.toString())
  
  // const intervalId = setInterval(async () => {
  //   if(!accountList[i].tel || !accountList[i].password) return
   
  // console.log(accountList[i])
  //  i++

   
  // },15000)
 

    while(true) {
      if(i === 20) {
        j++
        i = 0  
        return await main(accountList[j].tel,accountList[j].password, 'https://h5.touziapi.com/#/pages/setting/Login/Login')
        
      } else if(i === 0) {
        
        await main(accountList[j].tel,accountList[j].password, 'https://h5.touziapi.com/#/pages/setting/Login/Login')
        setTimeout(() => i++)
        
      }
    }
  
 
  
  
})


const e = new EventEmitter()
// await main('9638727918','FmVWbMC5fazn3WA', 'https://h5.touziapi.com/#/pages/setting/Login/Login')
async function main(tel,password, url) {
  
  const driver = await new Builder().forBrowser(Browser.CHROME).build()
  driver.get(url).then(() => setTimeout(()=> e.emit('authorization'),2000))

  e.once('authorization', async () => {
    //Авторизация, отправляем в полученые инпуты номер телефона и пароль
    driver.findElement(By.className("content-body-card"))
    .then(inputs => {
      inputs.findElement(By.xpath("//input[@type='tel']")).sendKeys(tel)
      inputs.findElement(By.xpath("//input[@type='password']")).sendKeys(password)
      setTimeout(() => e.emit('choice-country'),100)
    })
  })

  e.once('choice-country', () => {
    driver.findElement(By.className('login-form-item-right-text')).click()
    .then(() => {
      driver.findElement(By.name("content")).then(countryMeny => {

        setTimeout(() => {
          countryMeny.findElement(By.className('uni-searchbar'))
          .then(searchInput => {
            searchInput.click()
            e.emit('choose-country')
          })
        },500)
        
      })
    })
  })

  e.once('choose-country',  () => {
    setTimeout(async() => {
      await driver.findElement(By.xpath("//input[@type='search']")).sendKeys('Russia')
      setImmediate(async ()=> await driver.findElement(By.xpath("//input[@type='search']")).click())
    },500)
    setTimeout(async() => {
      await driver.findElement(By.xpath("//input[@type='search']")).sendKeys(Key.RETURN)
      await driver.findElement(By.className("popup-content-list-item-text")).click()
      e.emit('login')
    }, 800)
  })

  e.once('login', () => {
    driver.findElement(By.className("content-body-button")).click()
    .then(() => setTimeout(() => {
      
      e.emit('get-gift')
    
    },800))
  })
  
  // Получение 6 баксов не работает, надо исправить!
  // e.once('check-reward', async () => {
  //   await driver.executeScript(`window.location.href='https://h5.touziapi.com/#/pages/profile/Record/Record'`)

  //   setTimeout(() => {
  //     try{
  //       driver.findElement(By.id("categoryItemnav2")).click()
  //       .then(() => {
  //         setTimeout(async () => {
  //           try {
  //             if(Boolean(await driver.findElement(By.className("success")))) {
  //               console.log('Награда уже получена!')
  //               // e.emit('get-gift')
  //               // e.emit('next-account')
  //             }
  //           } catch (err) {
  //             console.log('Можно получить награду!')
              
  //             // const btn = await driver.findElement(By.xpath("(//uni-view[@class='right'])"))
  //             setInterval(async () =>  await driver.findElement(By.className('right')).click(),3000)
  //             console.log('Награда получена!')
  //             // e.emit('get-gift')
  //             // e.emit('next-account')
  //           }
            
  //         },2000)
  //       })
  //     }catch(err) {
  //       return
  //     }
    

  // },1500)
  

  // })

  e.on('get-gift', () => {

    driver.executeScript('return document.location.href = "https://h5.touziapi.com/#/pages/missionHall/PanicBuying/PanicBuying"').then(() => {
      
      
      setInterval(async () => {
        try{
          if(Boolean(banner)) {
            const banner  = await driver.findElement(By.className('banner'))
            banner.findElement(By.className('banner-footer-text-available')).click()
            setTimeout(async() => {
              const modalWindowLucky = await  driver.findElement(By.className('luckly-money-content'))
              await modalWindowLucky.findElement(By.className('luckly-money-footer-btn')).click()
              i++
            },8000)
          }
          

        }catch(err) {
          
          i=20
          // setTimeout(async () => await driver.quit())
          
        }
        

        
      },10000)

      
      
    })

  })


}




  