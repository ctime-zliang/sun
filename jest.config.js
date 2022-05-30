const utils = require('./config/utils')

/*
	jest --runInBand
		使用参数 --runInBand 执行 jest 命令, 即禁用并行测试执行
 */

const base = () => {
	const profile = {
		rootDir: './',
		verbose: true,
		automock: false,
		clearMocks: false,
		// dependencyExtractor: {},
		errorOnDeprecated: true,
	}
	if (utils.puppeteerCustomOnly()) {
		/*
			每次所有测试执行前需要执行的脚本(测试起始前置脚本)
		 */
		profile.globalSetup = './config/jest-puppeteer/setup.js'
		/*
			每次所有测试执行结束后需要执行的脚本(测试结束后置脚本) 
		 */
		profile.globalTeardown = './config/jest-puppeteer/teardown.js'
		/* 
			测试开始前预置环境的执行脚本
				一个可以实例化的类
		 */
		profile.testEnvironment = './config/jest-puppeteer/puppeteer-environment.js'
	} else if (utils.puppeteerOnly()) {
		/*
			使用 jest-puppteer 预设来初始化 jest puppeteer 环境及基础配置
		 */
		profile.preset = 'jest-puppeteer'
	} else {
		profile.setupFiles = ['./config/jest/setup/setup.js']
		profile.testEnvironment = 'jsdom'
		profile.testURL = 'http://localhost'
	}
	return profile
}

const testRule = () => {
	const TEST_PATH_IGNORE_PATTERNS = [
		'dist',
		'node_modules',
		/* ... */
		'e2e',
		'tests/@reference',
	]
	let testPathIgnorePatterns = []
	let testRegex = undefined
	if (utils.puppeteerOnly() || utils.puppeteerCustomOnly()) {
		testPathIgnorePatterns = [
			'dist',
			'node_modules',
			/* ... */
			'tests',
			'tests/@reference',
		]
		testRegex = './e2e/.*\\.(test|spec)\\.(js|jsx)?$'
	} else {
		testPathIgnorePatterns = [...TEST_PATH_IGNORE_PATTERNS]
		testRegex = './tests/.*\\.(test|spec)\\.(js|jsx)?$'
	}
	return {
		moduleNameMapper: {
			'^@/(.*)$': '<rootDir>/src/$1',
			'.*\\.(css|less|styl|scss|sass)$': '<rootDir>/config/jest/mocks/cssModule.js',
			'.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/config/jest/mocks/image.js',
		},
		moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
		moduleDirectories: ['node_modules', './src'],
		cacheDirectory: `./.cache`,
		watchPathIgnorePatterns: ['webpack/dist'],
		testPathIgnorePatterns,
		testRegex,
	}
}

const transofrm = () => {
	return {
		transform: {
			'^.+\\.(js|jsx|mjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
			'^.+\\.(css|less)$': '<rootDir>/config/jest/setup/cssTransform.js',
			'^(?!.*\\.(js|jsx|mjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/setup/fileTransform.js',
		},
	}
}

const coverage = () => {
	let collectCoverage = utils.jestCoverage()
	if (utils.puppeteerOnly() || utils.puppeteerCustomOnly()) {
		collectCoverage = false
	}
	return {
		coverageDirectory: './coverage',
		coverageProvider: 'babel',
		collectCoverageFrom: ['src/**/*.{js,jsx,mjs,ts,tsx}'],
		coveragePathIgnorePatterns: [
			'node_modules',
			'config',
			/* ... */
			'src/types',
		],
		coverageReporters: ['json-summary', 'text', 'lcov'],
		coverageThreshold: {
			global: {
				statements: 90,
				branches: 90,
				functions: 90,
				lines: 90,
			},
		},
		collectCoverage,
	}
}

const snapshot = () => {
	return {
		snapshotSerializers: ['enzyme-to-json/serializer'],
	}
}

const extend = () => {
	return {
		globals: {
			__JEST_SETUP__: true,
			__DEV__: true,
		},
	}
}

module.exports = () => {
	return {
		...base(),
		...testRule(),
		...transofrm(),
		...coverage(),
		...snapshot(),
		...extend(),
	}
}
