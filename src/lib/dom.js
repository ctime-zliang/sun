import { NODE_TYPE } from '../config/config'

export function createDOM(fiber) {
	const dom = fiber.type === NODE_TYPE.TEXT_NODE ? document.createTextNode(``) : document.createElement(fiber.type)
	Object.keys(fiber.props)
		.filter((item, index) => {
			return item != 'children'
		})
		.forEach((item, index) => {
			dom[item] = fiber.props[item]
		})

	return dom
}
