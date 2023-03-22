#!/usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer')
const { getAccountCache, setCache } = require('../src/utils/cache.js')
const { loginIconfont } = require('../src/utils/login.js')
const { downloadIconZip } = require('../src/utils/download.js')
const { moveFile, unzipFile, cleanUp } = require('../src/utils/fileHandler')
const { DOWNLOAD_TEMP_FILE_PATH, DOWNLOAD_TEMP_PATH } = require('../src/conf/iconfont.conf.js')
const { resolve } = require('path')
const path = require('path')
const { logInfo } = require('../src/utils/utils')

function queryAccount () {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'input username'
    },
    {
      type: 'input',
      name: 'password',
      message: 'input password'
    }
  ])
}

async function updateIconFile (account, iconfontPath, projectID) {
  const { page, browser } = await loginIconfont(account)
  await downloadIconZip(page, projectID)
  await browser.close()
  unzipFile(DOWNLOAD_TEMP_FILE_PATH, DOWNLOAD_TEMP_PATH)
  moveFile(DOWNLOAD_TEMP_PATH, path.join(resolve('./'), iconfontPath))
  cleanUp(DOWNLOAD_TEMP_PATH)
}

// 参数
logInfo('参数：', process.argv)

program
  .argument('<path>', 'iconfont路径')
  .argument('<projectID>', 'iconfont项目ID')
  .action(async (iconfontPath, projectID) => {
    logInfo('iconfontPath: ', iconfontPath)
    logInfo('projectID: ', projectID)

    const accountCache = getAccountCache()
    if (accountCache) {
      updateIconFile(accountCache, iconfontPath, projectID)
    } else {
      const account = await queryAccount()
      setCache(account)
      updateIconFile(account, iconfontPath, projectID)
    }
  })
program.parse()
