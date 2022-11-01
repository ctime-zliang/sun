/**
 * 该试验库依据"Build Your React"拓展改编
 */

import { __RTP__, __RTCP__ } from './core/runtime'
import { createRootFiber, flatArray, generateFiberStructData, generateInitialVDOMStructData } from './utils/utils'
import { TVDom } from './types/vdom.types'
import { ENUM_NODE_TYPE } from './config/effect.enum'
import { globalConfig, renderProfile } from './config/config'
import { TFiberNode } from './types/fiber.types'
import { EFiberType } from './config/fiber.enum'
import { initAsyncWorkLoop, initSyncWorkLoop } from './lib/scheduler'
import { TCreateRootFiberResult } from './types/commmon'

window.__RTP__ = __RTP__
window.__RTCP__ = __RTCP__

/**
 * 创建一个全局顶层 fiber: globalFiberRoot
 * 		当需要 render 多个实例时(仅指首次 render)
 * 		globalFiberRoot.current 将依次(按照 render 调用先后顺序)指向各个 <App /> 对应的 fiber 树的根 fiber 节点
 */
__RTP__.globalFiberRoot = Object.create({
	current: undefined,
})

__RTP__.profile = { ...renderProfile }

/**
 * @description 创建元素 vDom
 * @function createElement
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {TVDom}
 */
export function createElement(type: any, props: { [key: string]: any }, ...children: Array<any>): TVDom {
	let $$type: any = typeof type === 'object' ? type.type : type
	let $$typeof: any = undefined
	if (typeof type === 'object' && type.typeof) {
		$$typeof = type.typeof
	} else if (type instanceof Function) {
		if (type['__@@INSIDE_FRAGMENT_ANCHOR'] === true) {
			$$typeof = EFiberType.Fragment
		} else {
			$$typeof = 'function'
		}
	} else {
		$$typeof = $$type
	}
	/**
	 * Array.flat(Infinity) 性能问题
	 * 这可能不是一个好的实现方式
	 */
	// const flatChildren: Array<any> = (children as any).flat(Infinity) // or children.flat(1)
	const flatChildren: Array<any> = flatArray(children)
	const elementVDom: TVDom = generateInitialVDOMStructData($$type, {
		...props,
		children: flatChildren.map((child: any): void => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
		$$typeof,
	})
	return elementVDom
}

/**
 * @description 创建文本 vDom
 * @function createTextElement
 * @param {string} text 文本内容
 * @return {TVDom}
 */
export function createTextElement(text: string): TVDom {
	const textVDom: TVDom = generateInitialVDOMStructData(ENUM_NODE_TYPE.TEXT_NODE, {
		children: [],
		nodeValue: text,
		$$typeof: `text`,
	})
	return textVDom
}

/**
 * @description 设置 fiber 树遍历模式为 同步递归 模式
 * @function setSyncMode
 * @return {void}
 */
export function setSyncMode(): void {
	__RTP__.profile.async = false
}

/**
 * @description 渲染 JSX 节点
 * @function render
 * @param {JSXElement} element JSX 节点
 * @param {HTMLElement} container 容器 HTML DOM 节点
 * @param {object} profile 配置项
 * @return {void}
 */
export function render(element: TVDom, container: HTMLElement): void {
	const handler: TCreateRootFiberResult = createRoot(container)
	handler.render(element)
}

/**
 * @description 创建渲染根节点
 * 		创建 root-fiber 节点
 * 		返回 root-fiber-controller 实例
 * @function createRoot
 * @param {HTMLElement} container 容器 HTML DOM 节点
 * @param {object} profile 配置项
 * @return {RootFiberController}
 */
export function createRoot(container: HTMLElement): TCreateRootFiberResult {
	let rootFiber: TFiberNode = createRootFiber(container)
	return {
		render(element: TVDom) {
			rootFiber.props.children.push(element)
			rootFiber.dirty = true
			if (!__RTP__.profile.async || (__RTP__.globalFiberRoot && !__RTP__.globalFiberRoot.current)) {
				__RTP__.globalFiberRoot.current = rootFiber
				__RTP__.nextWorkUnitFiber = rootFiber
				if (__RTP__.profile.async) {
					window.requestIdleCallback(initAsyncWorkLoop(), { timeout: globalConfig.requestIdleCallbackTimeout })
				} else {
					initSyncWorkLoop()()
				}
			}
			rootFiber = undefined as unknown as TFiberNode
		},
	}
}

/**
 * @description memo 优化
 * 		设置当 props 浅对比为 false 时跳过该 JSX Element 的本次执行
 * @function memo
 * @param {JSXElement} element JSX 节点
 * @return {TFiberNode}
 */
export function memo(element: Function): TFiberNode {
	return generateFiberStructData({
		type: element,
		typeof: EFiberType.Memo,
	})
}

/**
 * @description 文档碎片 JSX 元素
 * @function Fragment
 * @return {DocumentFragment}
 */
export function Fragment(): DocumentFragment {
	return document.createDocumentFragment()
}
Fragment['__@@INSIDE_FRAGMENT_ANCHOR'] = true
