const chalk = require('chalk')
const JestEnvironmentNode = require('jest-environment-node')
const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const getRuntimeFiledir = require('./get.runtime.filedir')

const DIR = getRuntimeFiledir()

/* 
	PuppeteerEnvironment
		this = {
			context
				// 一组包含特定属性和方法的上下文对象
			global
				// jest 运行时的全局对象
				// 可在 test 测试文件中直接访问该对象
				// 和 node 内置的 global 不属于同一个对象, 后者无法在 test 测试文件中被访问到
		}
 */
class PuppeteerEnvironment extends JestEnvironmentNode {
	constructor(config) {
		super(config)
	}

	async setup() {
		console.log(chalk.yellow('Setup Test Environment'))
		await super.setup()
		const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8')
		// ws://127.0.0.1:58476/devtools/browser/55f447c3-d364-48e9-9bf1-44146d7c093d
		if (!wsEndpoint) {
			throw new Error('wsEndpoint not found')
		}
		const browser = await puppeteer.connect({
			browserWSEndpoint: wsEndpoint,
		})
		/*
            写入 jest 环境中的全局对象
         */
		this.global.page = await browser.newPage()
	}

	async teardown() {
		console.log(chalk.yellow('Teardown Test Environment'))
		await super.teardown()
	}

	runScript(script) {
		return super.runScript(script)
	}
}

module.exports = PuppeteerEnvironment
