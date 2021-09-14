const webpack = require('webpack')
const { ESBuildPlugin } = require('esbuild-loader')
const rules = require('./webpack-lib.rules')
const utils = require('./utils')

const webpackConfigBase = {
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.jsx'],
		alias: {
			'@': utils.resolveDirectory('./src/'),
		},
	},
	module: {
		rules: rules(),
	},
	plugins: [new ESBuildPlugin(), new webpack.ProgressPlugin()],
	optimization: {},
}

module.exports = webpackConfigBase
