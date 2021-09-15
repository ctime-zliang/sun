const path = require('path')
const fs = require('fs')

function DtsBundlePlugin(opt){
	this.options = { ...opt }
}
DtsBundlePlugin.prototype.apply = function (compiler) {
	compiler.hooks.done.tap('done', async () => {
		const dts = require('dts-bundle')
		console.log(`--------------------------->`)
		const r = dts.bundle({
			name: `sun`,
			baseDir: this.options.rootPath,
			main: path.join(this.options.rootPath, this.options.entry),
			out: path.join(this.options.rootPath, this.options.output),
			removeSource: true,
			verbose: false,
			outputAsModuleFolder: true
		})
		fs.unlinkSync(this.options.rootPath)
		console.log(`=================================>`)
	})
}

module.exports = {
	DtsBundlePlugin
}
