const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const OS = require('os')
const { ESBuildPlugin } = require('esbuild-loader')
const rules = require('./webpack.rules')

// const HappyThreadPoolCase = HappyPack.ThreadPool({ size: OS.cpus().length })
const webpackConfigBase = {
	resolve: {
		extensions: ['.js', '.ts'],
	},
	module: {
		rules: rules(),
	},
	plugins: [
		new ESBuildPlugin(),
		// new HappyPack({
		// 	id: 'happyBabelForJSX',
		// 	loaders: [
		// 		{
		// 			loader: 'babel-loader?cacheDirectory=true',
		// 		},
		// 	],
		// 	threadPool: HappyThreadPoolCase,
		// 	verbose: true,
		// }),
		// new HappyPack({
		// 	id: 'happyBabelForTSX',
		// 	loaders: [
		// 		{
		// 			loader: 'babel-loader?cacheDirectory=true',
		// 		},
		// 	],
		// 	threadPool: HappyThreadPoolCase,
		// 	verbose: true,
		// }),
		new webpack.ProgressPlugin(),
	],
	optimization: {},
}

module.exports = webpackConfigBase