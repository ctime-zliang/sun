import { NODE_TYPE } from './config/config'
import { __RUNTIME_PROFILE___ } from './runtime/runtime.profile'
import { workLoop } from './lib/scheduler'
import { generateStructFiber, generateStructVDOM } from './utils/utils'

/**
 * 创建 元素 VDOM
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {htmlelement} 元素 VDOM
 */
export function createElement(type, props, ...children) {
	return generateStructVDOM(type, {
		...props,
		children: children.map(child => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
	})
}

/**
 * 创建 文本 VDOM
 * @param {string} text 文本内容
 * @return {htmlelement} 文本 VDOM
 */
export function createTextElement(text) {
	return generateStructVDOM(NODE_TYPE.TEXT_NODE, {
		nodeValue: text,
		children: [],
	})
}

export function render(element, container) {
	/*
		创建渲染起始 fiber 对象
		创建根节点(容器节点)的 fiber 对象并将其作为初始 fiber
	 */
	const startFiber = generateStructFiber({
		dom: container,
		type: container.nodeName.toLowerCase(),
		props: { children: [element] },
		// 初始时为 null
		alternate: __RUNTIME_PROFILE___.currentRoot,
	})
	__RUNTIME_PROFILE___.workInProgressRootFiber = startFiber
	__RUNTIME_PROFILE___.nextWorkUnitFiber = startFiber
	__RUNTIME_PROFILE___.deletions = []
	console.log(`Root.Fiber 初始化 ===> `, startFiber)
	window.requestIdleCallback(workLoop)
}
