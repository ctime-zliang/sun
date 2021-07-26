const fs = require('fs')
const path = require('path')

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
}
