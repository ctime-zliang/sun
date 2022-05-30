const fs = require('fs')
const utils = require('../utils')

const JEST_PUPPETEER_CONFIG_DIR = `./jest-puppeteer.config.js`

module.exports = () => {
	const fullPath = utils.resolveDirectory(JEST_PUPPETEER_CONFIG_DIR)
	if (!fs.existsSync(fullPath)) {
		return null
	}
	const fileData = require(fullPath)
	if (typeof fileData === 'function') {
		try {
			return fileData.call(undefined)
		} catch (e) {
			console.log(`Read ${JEST_PUPPETEER_CONFIG_DIR} File Error`)
			console.log(e)
			return null
		}
	}
	return fileData
}
