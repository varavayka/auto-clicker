import driver from '../lib/driver.mjs'
import e from '../lib/events.mjs'
import { Key, By } from 'selenium-webdriver'
function country() {
  e.once('country', async () => {

   await driver.findElement(By.className('login-form-item-right-text')).click()

   setTimeout(async () => {
    await driver.findElement(By.className('uni-searchbar__box')).click()

    const specifyRegion = await driver.findElement(By.xpath("//input[@type='search']"))
    await specifyRegion.sendKeys('Russia')

    setTimeout(async () => {
      await specifyRegion.sendKeys(Key.RETURN)
      await driver.findElement(By.className('popup-content-list-item-text')).click()
    },500)

   },800)
  
  })
}
export default country

