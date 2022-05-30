const path = require('path')
const webpack = require('webpack')
const { ESBuildPlugin } = require('esbuild-loader')
const { DtsBundlePlugin } = require('./webpack-lib.plugins.utils')

const webpackLibInitConfig = {
	target: 'web',
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
	},
	module: {},
	plugins: [
		new ESBuildPlugin(),
		new webpack.ProgressPlugin(),
		new DtsBundlePlugin({
			name: `sun`,
			/* ... */
			rootPath: path.join(process.cwd(), './build/@types'),
			entry: './index.d.ts',
			output: '../index.d.ts',
		}),
	],
}

module.exports = webpackLibInitConfig
