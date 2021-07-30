import { NODE_TYPE } from './config/config'
import { __RUNTIME_PROFILE___ } from './runtime/runtime.profile'
import { workLoop } from './lib/scheduler'
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
		children: children.map((child) => {
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
	/*
		创建根节点(容器节点)的 fiber 对象
			此时的 child 不存在, 由后续处理时写入
	 */
	__RUNTIME_PROFILE___.workInProgressRootFiber = generateStructFiber({
		dom: container,
		type: container.nodeName.toLowerCase(),
		props: {
			children: [element],
		},
		alternate: __RUNTIME_PROFILE___.currentRoot,
	})
	__RUNTIME_PROFILE___.nextWorkUnitFiber = __RUNTIME_PROFILE___.workInProgressRootFiber
	__RUNTIME_PROFILE___.deletions = []
	console.log(`Root.Fiber 初始化 ===> `, __RUNTIME_PROFILE___.workInProgressRootFiber)
	window.requestIdleCallback(workLoop)
}
