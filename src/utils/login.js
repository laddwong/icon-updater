const { LOGIN_URL, KEY_SELECTOR, LOGIN_REQ_URL } = require('../conf/iconfont.conf.js')
const puppeteer = require('puppeteer')
const { delay, logError } = require('./utils')
const { setCache } = require('./cache.js')

module.exports = {
  loginIconfont: async (account) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector(KEY_SELECTOR.USERNAME_INPUT)
    await page.waitForSelector(KEY_SELECTOR.PASSWORD_INPUT)
    await page.$eval(KEY_SELECTOR.USERNAME_INPUT, (input, username) => { input.value = username }, account.username)
    await page.$eval(KEY_SELECTOR.PASSWORD_INPUT, (input, password) => { input.value = password }, account.password)
    try {
      await Promise.all([
        page.click(KEY_SELECTOR.SUBMIT_BTN),
        page.waitForResponse(response => response.url().includes(LOGIN_REQ_URL))
      ])
    } catch (error) {
      setCache({ username: '', password: '' })
      logError('帐号密码错误')
    }
    await delay(1000)
    if (await page.$(KEY_SELECTOR.SUBMIT_BTN)) {
      setCache({ username: '', password: '' })
      logError('帐号密码错误')
    }
    return { page, browser }
  }
}
