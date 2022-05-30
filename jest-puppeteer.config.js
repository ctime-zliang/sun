module.exports = {
	launch: {
		// headless: process.env.HEADLESS !== 'false',
		headless: false,
		slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
		devtools: true,
		args: ['–no-sandbox', '--start-maximized'],
	},
}
