const chalk = require('chalk')

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))
const logSuccess = msg => {
  console.log(chalk.green(msg))
}
const logInfo = (msg, ...data) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(chalk.blue(msg), ...data)
  }
}
const logWarning = msg => {
  console.log(chalk.yellow(msg))
}
const logError = msg => {
  console.log(chalk.red(msg))
  throw new Error(msg)
}

module.exports = {
  delay,
  logSuccess,
  logInfo,
  logWarning,
  logError
}
