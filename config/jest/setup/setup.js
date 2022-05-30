/* setup 可预置为空 */

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import utils from '../../utils'

Enzyme.configure({ adapter: new Adapter() })

jest.setTimeout(30000)

// jest.mock('react-router-dom', () => {
// 	const originalModule = jest.requireActual('react-router-dom')
// 	return {
// 		__esModule: true,
// 		...originalModule,
// 		useLocation: jest.fn().mockReturnValue({
// 			pathname: '/',
// 			search: '',
// 			hash: '',
// 			state: null,
// 			key: '5nvxpbdafa',
// 		}),
// 		useHistory: jest.fn().mockReturnValue({
// 			length: 2,
// 			action: 'POP',
// 			location: {
// 				pathname: '/',
// 				search: '',
// 				hash: '',
// 			},
// 		}),
// 	}
// })

if (!utils.puppeteerOnly()) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation(query => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	})
}
