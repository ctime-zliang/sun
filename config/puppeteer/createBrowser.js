const puppeteer = require('puppeteer')

module.exports = async () => {
	const browser = await puppeteer.launch({
		headless: false,
		ignoreHTTPSErrors: true,
		slowMo: 100,
		handleSIGINT: true,
		timeout: 30000,
		dumpio: true,
		devtools: true,
		defaultViewport: {
			width: 1024,
			height: 720,
		},
		args: ['–no-sandbox', '--start-maximized'],
	})
	return browser
}
