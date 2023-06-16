import driver from '../lib/driver.mjs'
import e from '../lib/events.mjs'
import { Key, By } from 'selenium-webdriver'
function login() {
  e.once('login', async () => {
   
   await driver.findElement(By.className("content-body-button")).click()
  })
}
export default login

