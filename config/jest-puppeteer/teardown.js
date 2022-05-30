const chalk = require('chalk')
const rimraf = require('rimraf')
const getRuntimeFiledir = require('./get.runtime.filedir')

const DIR = getRuntimeFiledir()

module.exports = async () => {
	console.log(chalk.green('Teardown Puppeteer <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'))
	await global.__BROWSER_GLOBAL__.close()
	delete global.__JEST_PUPPETEER_SETUP__
	rimraf.sync(DIR)
}
