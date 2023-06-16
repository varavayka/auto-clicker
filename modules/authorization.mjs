import driver from '../lib/driver.mjs'
import e from '../lib/events.mjs'
import { Key, By } from 'selenium-webdriver'
function auth() {
  e.once('auth', async (phoneNumber,pwd) => {
   
   const mainInputWrapper = await driver.findElement(By.className("content-body-card"))
   const tel = await mainInputWrapper.findElement(By.xpath("//input[@type='tel']")).sendKeys(phoneNumber)
   const password = await mainInputWrapper.findElement(By.xpath("//input[@type='password']")).sendKeys(pwd)
  })
}
export default auth
