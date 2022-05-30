const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const utils = require('./utils')

const jsEsbuildLoader = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'jsx',
		target: 'es2015',
		jsxFactory: 'Sun.createElement',
		jsxFragment: 'Sun.Fragment',
	},
}
const tsEsbuildLoader = {
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	loader: 'esbuild-loader',
	options: {
		loader: 'tsx',
		target: 'es2015',
		jsxFactory: 'Sun.createElement',
		jsxFragment: 'Sun.Fragment',
		tsconfigRaw: require('../tsconfig.json'),
		minify: false,
		minifyWhitespace: false,
		sourcemap: true,
	},
}
const tsLoader = {
	test: /\.(ts|tsx)$/,
	exclude: /node_modules/,
	loader: 'ts-loader',
}

module.exports = type => {
	return {
		libProdBuild: {
			oneOf: [
				jsEsbuildLoader,
				tsLoader,
				// tsEsbuildLoader
			],
		},
		testDevBuild: {
			oneOf: [jsEsbuildLoader, tsEsbuildLoader],
		},
	}[type]
}
