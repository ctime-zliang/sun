const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const webpackLibBaseConfig = require('./webpack-lib.base.config')
const webpackLibDevServerConfig = require('./webpack-lib.dev-server.config')

// const HappyThreadPoolCase = HappyPack.ThreadPool({ size: OS.cpus().length })
const distChildPath = `/prod`
const webpackConfig = {
	// target: 'web',
	mode: 'development',
	entry: {
		main: utils.resolveDirectory(`./src/index.ts`)
	},
	output: {
		path: utils.resolveDirectory(`./dist/${distChildPath}`),
		filename: `[name].js`,
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			filename: `./dist/${distChildPath}/index.html`,
			template: utils.resolveDirectory(`./src/template/index.ejs`),
			inject: true,
		}),
	]
}

module.exports = merge(webpackConfig, webpackLibBaseConfig)