const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackLibBaseConfig = require('./webpack-lib.base.config')
const utils = require('./utils')

const webpackConfig = {
	target: 'web',
	mode: 'production',
	entry: {
		main: utils.resolveDirectory(`./src/index.js`),
	},
	output: {
		path: utils.resolveDirectory(`./dist`),
		filename: `sun.js`,
		libraryExport: 'default',
		libraryTarget: 'umd',
	},
	plugins: [],
}

module.exports = merge(webpackConfig, webpackLibBaseConfig)
