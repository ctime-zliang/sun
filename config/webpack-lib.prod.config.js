const path = require('path')
const { merge } = require('webpack-merge')
const utils = require('./utils')
const webpackLibBaseConfig = require('./webpack-lib.base.config')

// const HappyThreadPoolCase = HappyPack.ThreadPool({ size: OS.cpus().length })
const webpackProdConfig = {
	// target: 'web',
	mode: 'production',
	entry: {
		main: utils.resolveDirectory(`./src/index.ts`)
	},
	output: {
		path: utils.resolveDirectory(`./dist/prod`),
		filename: `[name].js`,
	},
	devtool: 'source-map',
}

module.exports = merge(webpackProdConfig, webpackLibBaseConfig)