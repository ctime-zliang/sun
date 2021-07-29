import { NODE_TYPE } from './config/config'
import { RT_PROFILE } from './config/runtime.profile'
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

export function useState(initValue) {
	const alternate = RT_PROFILE.workInProgressFiber.alternate
	const oldHook = alternate && alternate.hooks && alternate.hooks[RT_PROFILE.hookIndex]
	const actions = oldHook ? oldHook.queue : []
	const hook = {
		state: oldHook ? oldHook.state : initValue,
		queue: [],
	}
	actions.forEach((item, index) => {
		hook.state = item(hook.state)
	})
	const setState = action => {
		hook.queue.push(action)
		RT_PROFILE.nextWorkUnitFiber = RT_PROFILE.workInProgressRootFiber = generateStructFiber({
			dom: RT_PROFILE.currentRoot.dom,
			type: RT_PROFILE.currentRoot.dom.nodeName.toLowerCase(),
			props: RT_PROFILE.currentRoot.props,
			alternate: RT_PROFILE.currentRoot,
		})
		RT_PROFILE.deletions = []
	}
	RT_PROFILE.workInProgressFiber.hooks.push(hook)
	RT_PROFILE.hookIndex++
	return [hook.state, setState]
}

export function render(element, container) {
	RT_PROFILE.nextWorkUnitFiber = RT_PROFILE.workInProgressRootFiber = generateStructFiber({
		dom: container,
		type: container.nodeName.toLowerCase(),
		props: {
			children: [element],
		},
		alternate: RT_PROFILE.currentRoot,
	})
	RT_PROFILE.deletions.length = 0
	console.log(`Root.Fiber 初始化 ===> `, RT_PROFILE.workInProgressRootFiber)
	window.requestIdleCallback(workLoop)
}
