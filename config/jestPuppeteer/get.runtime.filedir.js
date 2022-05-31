const fs = require('fs')
const path = require('path')

module.exports = () => {
	return path.join(process.cwd() + '/.puppeteer/', 'jest_puppeteer_global_setup')
}
