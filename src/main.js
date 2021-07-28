import { NODE_TYPE } from './config/config'
import { initWorkLoop, performUnitWork } from './lib/scheduler'
import { generateStructFiber, generateStructVDOM } from './utils/utils'

export function createElement(type, props, ...children) {
	return generateStructVDOM(type, {
		...props,
		children: children.map((child, index) => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
	})
}

export function createTextElement(text) {
	return generateStructVDOM(NODE_TYPE.TEXT_NODE, {
		nodeValue: text,
		children: [],
	})
}

export function render(element, container) {
	const rootWorkUnit = generateStructFiber(
		container, // dom
		container.nodeName.toLowerCase(), // type
		{
			children: [element],
		} // props
	)
	const workInProgress = rootWorkUnit
	console.log(`Root.Fiber 初始化 ===> `, rootWorkUnit)
	const workLoop = initWorkLoop(rootWorkUnit, workInProgress)
	window.requestIdleCallback(workLoop)
}
