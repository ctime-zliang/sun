import { NODE_TYPE } from './config/config'
import { RT_PROFILE } from './config/runtime.profile'
import { initWorkLoop } from './lib/scheduler'
import { generateStructFiber, generateStructVDOM } from './utils/utils'

/**
 * 创建 元素 VDOM
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {element} 元素 VDOM
 */
export function createElement(type, props, ...children) {
	return generateStructVDOM(type, {
		...props,
		children: children.map((child, index) => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
	})
}

/**
 * 创建 文本 VDOM
 * @param {string} text 文本内容
 * @return {element} 文本 VDOM
 */
export function createTextElement(text) {
	return generateStructVDOM(NODE_TYPE.TEXT_NODE, {
		nodeValue: text,
		children: [],
	})
}

export function render(element, container) {
	const workInProgressFiberRoot = generateStructFiber({
		dom: container,
		type: container.nodeName.toLowerCase(),
		props: {
			children: [element],
		},
		alternate: RT_PROFILE.currentRoot,
	})
	RT_PROFILE.deletions.length = 0
	console.log(`Root.Fiber 初始化 ===> `, workInProgressFiberRoot)
	const workLoop = initWorkLoop(workInProgressFiberRoot)
	window.requestIdleCallback(workLoop)
}
