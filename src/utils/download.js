const {
  PROJECT_URL,
  DOWNLOAD_TEMP_PATH,
  DOWNLOAD_TEMP_FILE_PATH,
  DOWNLOAD_TIMEOUT
} = require('../conf/iconfont.conf.js')
const { KEY_SELECTOR } = require('../conf/iconfont.conf.js')
const fs = require('fs')
const { delay } = require('./utils')

module.exports = {
  /**
   * @description 下载图片压缩文件
   * @param {Puppeteer.Page} page
   * @param {string} projectID
   */
  async downloadIconZip (/** @type {Page} */ page, projectID) {
    const libraryUrl = `${PROJECT_URL}&projectId=${projectID}`
    await page.goto(libraryUrl)
    console.log('go to libraryUrl: ', libraryUrl)
    await page.waitForSelector(KEY_SELECTOR.DOWNLOAD_BTN)
    const client = await page.target().createCDPSession()
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: DOWNLOAD_TEMP_PATH
    })
    await page.$$eval(KEY_SELECTOR.GUIDE_CLOSE_BTN, (btns) => btns.map((btn) => btn.click()))
    await page.click(KEY_SELECTOR.DOWNLOAD_BTN)
    const start = Date.now()
    while (!fs.existsSync(DOWNLOAD_TEMP_FILE_PATH)) {
      // 每隔0.3秒看一下download.zip文件是否下载完毕，超时时间设为30秒
      await delay(300)
      if (Date.now() - start >= DOWNLOAD_TIMEOUT) {
        throw new Error('下载超时')
      }
    }
    await page.screenshot({ path: 'example.png' })
    console.log('zip 下载完成')
  },
  handleZipFile () {}
}
