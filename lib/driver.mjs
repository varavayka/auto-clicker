import { Builder, Browser } from "selenium-webdriver"

const driver = new Builder().forBrowser(Browser.CHROME).build()

export default driver

