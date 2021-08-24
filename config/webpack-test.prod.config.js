const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackTestBaseConfig = require('./webpack-test.base.config')
const utils = require('./utils')

const webpackConfig = {
	// target: 'web',
	mode: 'production',
	entry: {
		main: utils.resolveDirectory(`./app/index.jsx`),
	},
	output: {
		path: utils.resolveDirectory(`./build-test-prod`),
		filename: `[name].js`,
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: `./index.html`,
			template: utils.resolveDirectory(`./app/template/index.ejs`),
			inject: true,
		}),
	],
}

module.exports = merge(webpackConfig, webpackTestBaseConfig)
