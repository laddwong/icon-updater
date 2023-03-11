const path = require('path')

const config = {
  CACHE_FILE_NAME_PATH: path.join(__dirname, '../../cache/iconUpdaterCache'),
  DOWNLOAD_TIMEOUT: 30000, // 超时时间
  LOGIN_URL: 'https://www.iconfont.cn/login', // 登录页面url
  KEY_SELECTOR: {
    USERNAME_INPUT: '#userid',
    PASSWORD_INPUT: '#password',
    SUBMIT_BTN: '.mx-btn-submit',
    DOWNLOAD_BTN: '.project-manage-bar .btn-group > a.bar-text',
    GUIDE_CLOSE_BTN: '.btn-iknow'
  },
  LOGIN_REQ_URL: 'https://www.iconfont.cn/api/account/login.json', // 登录请求url
  PROJECT_URL: 'https://www.iconfont.cn/manage/index?manage_type=myprojects', // 项目管理url
  DOWNLOAD_TEMP_FILE_PATH: path.join(__dirname, '../../cache/download/download.zip'),
  DOWNLOAD_TEMP_PATH: path.join(__dirname, '../../cache/download')
}

module.exports = config
