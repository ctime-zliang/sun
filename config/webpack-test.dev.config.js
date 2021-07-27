const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackLibBaseConfig = require('./webpack-test.base.config')
const webpackLibDevServerConfig = require('./webpack-test.dev-server.config')
const utils = require('./utils')

// const HappyThreadPoolCase = HappyPack.ThreadPool({ size: OS.cpus().length })
const webpackConfig = {
	// target: 'web',
	mode: 'development',
	entry: {
		main: utils.resolveDirectory(`./tests/index.jsx`)
	},
	output: {
		path: utils.resolveDirectory(`./build-test-dev`),
		filename: `[name].js`,
	},
	devtool: 'source-map',
	devServer: webpackLibDevServerConfig,
	plugins: [
		new HtmlWebpackPlugin({
			filename: `./index.html`,
			template: utils.resolveDirectory(`./tests/template/index.ejs`),
			inject: true,
		}),
	]
}

module.exports = merge(webpackConfig, webpackLibBaseConfig)