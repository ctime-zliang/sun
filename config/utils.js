const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const ApplicationDirectory = fs.realpathSync(process.cwd())

module.exports = {
	resolveDirectory(relativePath) {
		return path.resolve(ApplicationDirectory, relativePath)
	},
	timeStamp() {
		const d = new Date()
		const arr = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
		return arr
			.map(item => {
				return item > 9 ? String(item) : '0' + String(item)
			})
			.join('')
	},
	deleteFolderRecursive(directory) {
		const self = this
		let files = []
		try {
			if (fs.existsSync(directory)) {
				files = fs.readdirSync(directory)
				files.forEach((file, index) => {
					const curPath = path.join(directory, file)
					if (fs.statSync(curPath).isDirectory()) {
						self.deleteFolderRecursive(curPath)
					} else {
						fs.unlinkSync(curPath)
					}
				})
				fs.rmdirSync(directory)
			} else {
				throw new Error(`exec deleteFolderRecursive error: path error, got: ${directory}`)
			}
		} catch (e) {
			console.error(e)
		}
	},
	clientOnly() {
		return process.argv.includes('client-only=true')
	},
	puppeteerOnly() {
		return process.argv.includes('--puppeteer=true')
	},
	puppeteerCustomOnly() {
		return process.argv.includes('--puppeteer=true') && process.argv.includes('--user-custom=true')
	},
	jestCoverage() {
		return process.argv.includes('--coverage')
	},
	createLoaderResult(string, isEsm = false) {
		const prefix = isEsm ? 'export default ' : 'module.exports = '
		return prefix + string
	},
	getStringExportContent(exportString) {
		try {
			if (/module.exports(.*)/gi.test(exportString)) {
				return exportString.replace(/module.exports(\s+)=(\s+)/gi, '')
			}
			if (/export default(.*)/gi.test(exportString)) {
				return exportString.replace(/export default(\s+)/gi, '')
			}
			return exportString
		} catch (e) {
			console.log(e)
			return
		}
	},
}
