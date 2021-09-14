const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackLibBaseConfig = require('./webpack-lib.base.config')
const webpackLibDevServerConfig = require('./webpack-lib.dev-server.config')
const utils = require('./utils')

const webpackConfig = {
	target: 'web',
	mode: 'development',
	entry: {
		main: utils.resolveDirectory(`./test-app/src/index.jsx`),
	},
	output: {
		path: utils.resolveDirectory(`./test-app/build-dev`),
		filename: `[name].js`,
	},
	devtool: 'source-map',
	devServer: webpackLibDevServerConfig,
	plugins: [
		new HtmlWebpackPlugin({
			filename: `./index.html`,
			template: utils.resolveDirectory(`./test-app/src/template/index.ejs`),
			inject: true,
		}),
	],
}

module.exports = merge(webpackConfig, webpackLibBaseConfig)
