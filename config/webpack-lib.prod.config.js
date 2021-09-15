const path = require('path')
const { merge } = require('webpack-merge')
const webpackLibBaseConfig = require('./webpack-lib.base.config')
const rules = require('./webpack-lib.rules')
const { DtsBundlePlugin } = require('./webpack-lib.plugins.utils')
const utils = require('./utils')

const webpackModule = webpackLibBaseConfig.module
delete webpackLibBaseConfig.module
const webpackConfig = {
	target: 'web',
	mode: 'production',
	entry: {
		main: utils.resolveDirectory(`./src/index.ts`),
	},
	output: {
		path: utils.resolveDirectory(`./dist`),
		filename: `sun.js`,
		libraryExport: 'default',
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	module: {
		...webpackModule,
		rules: [rules('libProdBuild')],
	},
	plugins: [
		new DtsBundlePlugin({
			rootPath: path.join(process.cwd(), './dist/@types'),
			entry: './index.d.ts',
			output: '../sun.d.ts'
		})
	],
}

module.exports = merge(webpackConfig, webpackLibBaseConfig)
