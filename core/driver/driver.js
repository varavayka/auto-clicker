const webdriver = require('selenium-webdriver')
const {Builder, Browser,Window} = webdriver
const chrome = require('selenium-webdriver/chrome')

// const chromeOptions = new chrome.Options();
// chromeOptions.addArguments('--headless')
// .setChromeOptions(chromeOptions)// не работает с безголовым режимом
// const proxyAddress = '69.84.182.13'
// const chromeOptions = new chrome.Options()
// chromeOptions.addArguments(`--proxy-server=${proxyAddress}:80`)
// .setChromeOptions(chromeOptions)

const driver = new Builder().forBrowser(Browser.CHROME).build()
driver.manage().window().maximize()
module.exports = driver