const chalk = require('chalk')
const puppeteer = require('puppeteer')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const getJestPuppeteerConfig = require('./get.jest-puppeteer.config')
const getRuntimeFiledir = require('./get.runtime.filedir')

const DIR = getRuntimeFiledir()

module.exports = async () => {
	console.log(`\n`)
	console.log(chalk.green('Puppeteer Setup >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'))
	const jestPuppeteerConfig = getJestPuppeteerConfig()
	const browser = await puppeteer.launch({
		...(jestPuppeteerConfig ? jestPuppeteerConfig.launch : {}),
	})
	/*
		将标记符写入 node global 对象, 但无法在 test 环境中的全局对象上访问这些属性或方法
	 */
	global.__BROWSER_GLOBAL__ = browser
	global.__JEST_PUPPETEER_SETUP__ = true
	/*
		使用文件系统来构建链接 
	 */
	mkdirp.sync(DIR)
	/*
		将 ws 链接地址写入文件 
	 */
	fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}
