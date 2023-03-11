const { LOGIN_URL, KEY_SELECTOR, LOGIN_REQ_URL } = require('../conf/iconfont.conf.js')
const puppeteer = require('puppeteer')
const { delay } = require('./utils')

module.exports = {
  loginIconfont: async (account) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector(KEY_SELECTOR.USERNAME_INPUT)
    await page.waitForSelector(KEY_SELECTOR.PASSWORD_INPUT)
    await page.$eval(KEY_SELECTOR.USERNAME_INPUT, (input, username) => { input.value = username }, account.username)
    await page.$eval(KEY_SELECTOR.PASSWORD_INPUT, (input, password) => { input.value = password }, account.password)
    // TODO：帐号校验
    await Promise.all([
      page.click(KEY_SELECTOR.SUBMIT_BTN),
      page.waitForResponse(response => response.url().includes(LOGIN_REQ_URL))
    ])
    await delay(1000)
    // TODO：提示
    await page.$(KEY_SELECTOR.SUBMIT_BTN) && console.error('账号或密码错误')
    return { page, browser }
  }
}
