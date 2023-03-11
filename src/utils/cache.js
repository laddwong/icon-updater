const { CACHE_FILE_NAME_PATH } = require('../conf/iconfont.conf.js')
const fs = require('fs')

/**
 * @description 缓存数据
 */
const setCache = (newData) => {
  const currData = getCache() || {}
  Object.keys(newData).forEach((key) => {
    currData[key] = newData[key]
  })
  try {
    fs.writeFileSync(CACHE_FILE_NAME_PATH, JSON.stringify(currData))
  } catch (error) {
    console.error('write file err', error)
  }
}
/**
 * @description 获取数据
 * @param {string} [key] 字段名
 */
const getCache = (key) => {
  try {
    let currData = fs.readFileSync(CACHE_FILE_NAME_PATH, 'utf-8')
    currData = JSON.parse(currData)
    if (key) {
      return currData[key] || ''
    }
    return currData
  } catch (error) {
    console.error('get file err', error)
    return ''
  }
}
/**
 * @description 获取帐号缓存
 */
const getAccountCache = () => {
  const username = getCache('username')
  const password = getCache('password')
  return username && password ? { username, password } : false
}
module.exports = {
  getCache,
  setCache,
  getAccountCache
}
