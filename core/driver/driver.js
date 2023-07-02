const webdriver = require('selenium-webdriver')
const {Builder, Browser,Window} = webdriver
const chrome = require('selenium-webdriver/chrome')

const driver = new Builder().forBrowser(Browser.CHROME).build()
driver.manage().window().maximize()

module.exports = driver