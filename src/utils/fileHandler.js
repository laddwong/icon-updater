const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')

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
}

const unzipFile = (zipFilePath, savePath) => {
  console.log(`unzip, s: ${zipFilePath}, d: ${savePath}`)
  const file = new AdmZip(zipFilePath)
  file.extractAllTo(savePath)
  console.log('unzip complete')
}

const moveFile = (sourcePath, destPath) => {
  const dirs = fs.readdirSync(sourcePath)
  for (const dir of dirs) {
    if (dir.startsWith('font_')) {
      console.log('start move')
      fs.renameSync(path.join(sourcePath, dir, '/iconfont.css'), destPath)
      break
    }
  }
}

module.exports = {
  unzipFile,
  moveFile,
  cleanUp
}
