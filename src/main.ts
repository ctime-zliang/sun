import { NODE_TYPE } from './config/config'
import { __RUNTIME_PROFILE___ } from './runtime/runtime.profile'
import { initWorkLoop } from './lib/scheduler'
import { generateStructFiber, generateStructVDOM, generateStructFiberRoot } from './utils/utils'

/* 
	创建一个全局的 fiberRoot
	并设置其 current 指针指向当前活动(即 处于 mount 或 update 时)的应用的顶层 fiber
 */
__RUNTIME_PROFILE___.fiberRoot = generateStructFiberRoot({
	current: null,
})

/**
 * 创建 元素 VDOM
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {htmlelement} 元素 VDOM
 */
export function createElement(type: any, props: { [key: string]: any }, ...children: any[]) {
	//@ts-ignore
	const flatChildren = children.flat(Infinity) // or children.flat(1)
	return generateStructVDOM(type, {
		...props,
		children: flatChildren.map((child: any) => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
	})
}

/**
 * 创建 文本 VDOM
 * @param {string} text 文本内容
 * @return {htmlelement} 文本 VDOM
 */
export function createTextElement(text: string) {
	return generateStructVDOM(NODE_TYPE.TEXT_NODE, {
		nodeValue: text,
		children: [],
	})
}

let renderIndex = -1
export function render(element: any, container: HTMLElement) {
	const rootFiber = generateStructFiber(
		{
			stateNode: container,
			type: container.nodeName.toLowerCase(),
			props: { children: [element] },
			alternate: null,
			dirty: true,
		},
		{
			/*
				当前 fiber 的索引编号, 保证值与该 fiber 在 fiber-list 中的位置索引一致 
			 */
			index: ++renderIndex,
			root: true,
		}
	)
	__RUNTIME_PROFILE___.rootFiberList.push(rootFiber)
	if (!__RUNTIME_PROFILE___.fiberRoot.current) {
		__RUNTIME_PROFILE___.fiberRoot.current = rootFiber
		__RUNTIME_PROFILE___.nextWorkUnitFiber = rootFiber
		console.log(`Root.Fiber ===>>>`, rootFiber)
		window.requestIdleCallback(initWorkLoop())
	}
}