const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const { logInfo, logSuccess } = require('./utils')

const cleanUp = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const curPath = path.join(dir, file)
    if (fs.lstatSync(curPath).isDirectory()) {
      cleanUp(curPath)
    } else {
      fs.unlinkSync(curPath)
    }
  })
  fs.rmdirSync(dir)
  logSuccess('清理完成')
}

const unzipFile = (zipFilePath, savePath) => {
  logInfo(`unzip, s: ${zipFilePath}, d: ${savePath}`)
  const file = new AdmZip(zipFilePath)
  file.extractAllTo(savePath)
  logSuccess('解压完成')
}

const moveFile = (sourcePath, destPath) => {
  const dirs = fs.readdirSync(sourcePath)
  for (const dir of dirs) {
    if (dir.startsWith('font_')) {
      fs.renameSync(path.join(sourcePath, dir, '/iconfont.css'), destPath)
      break
    }
  }
  logSuccess('更新完成')
}

module.exports = {
  unzipFile,
  moveFile,
  cleanUp
}
