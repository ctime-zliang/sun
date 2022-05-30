const timeout = process.env.SLOWMO ? 30000 : 10000

const TEST_URL = `http://www.baidu.com/`
const TEST_URL_TITLE = `百度一下，你就知道`

describe('Test Title of the page', () => {
	beforeAll(async () => {
		await page.goto(`${TEST_URL}`, { waitUntil: 'domcontentloaded' })
	})
	test(
		'Title of the page',
		async () => {
			await expect(page.title()).resolves.toMatch(TEST_URL_TITLE)
		},
		timeout
	)
})
