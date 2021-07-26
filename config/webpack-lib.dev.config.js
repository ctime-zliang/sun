const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('./utils')
const webpackLibBaseConfig = require('./webpack-lib.base.config')
const webpackLibDevServerConfig = require('./webpack-lib.dev-server.config')

// const HappyThreadPoolCase = HappyPack.ThreadPool({ size: OS.cpus().length })
const webpackDevConfig = {
	// target: 'web',
	mode: 'development',
	entry: {
		main: utils.resolveDirectory(`./src/index.ts`)
	},
	output: {
		path: utils.resolveDirectory(`./dist/dev`),
		filename: `[name].js`,
	},
	devtool: 'source-map',
	devServer: webpackLibDevServerConfig,
}

module.exports = merge(webpackDevConfig, webpackLibBaseConfig)