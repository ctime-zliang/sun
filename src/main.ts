/**
 * 该试验库依据"Build Your React"拓展改编
 */

import { __RTP__, __RTCP__ } from './core/runtime'
import { initAsyncWorkLoop, initSyncWorkLoop } from './lib/scheduler'
import { flatArray, generateFiberStructData, generateInitialFiberStructData, generateInitialVDOMStructData } from './utils/utils'
import { TVDom } from './types/vdom.types'
import { ENUM_NODE_TYPE } from './config/effect.enum'
import { TFiberNode } from './types/fiber.types'
import { globalConfig, renderProfile } from './config/config'

window.__RTP__ = __RTP__
window.__RTCP__ = __RTCP__

/**
 * 创建一个全局顶层 fiber: globalFiberRoot
 *
 * 		当需要 render 多个实例时(仅指首次 render)
 * 		globalFiberRoot.current 将依次(按照 render 调用先后顺序)指向各个 <App /> 对应的 fiber 树的根 fiber 节点
 */
__RTP__.globalFiberRoot = Object.create({
	current: undefined,
})

/**
 * @description 创建元素 vDom
 * @function createElement
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {TVDom}
 */
export function createElement(type: string, props: { [key: string]: any }, ...children: Array<any>): TVDom {
	/**
	 * Array.flat(Infinity) 性能问题
	 * 这可能不是一个好的实现方式
	 */
	// const flatChildren: Array<any> = (children as any).flat(Infinity) // or children.flat(1)
	const flatChildren: Array<any> = flatArray(children)
	const elementVDom: TVDom = generateInitialVDOMStructData(type, {
		...props,
		children: flatChildren.map((child: any): void => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
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
	})
	return textVDom
}

/**
 * @description 渲染 JSX 节点
 * @function render
 * @param {JSXElement} element JSX 节点
 * @param {HTMLElement} container 容器 HTML DOM 节点
 * @return {void}
 */
let renderIndex: number = -1
export function render(element: TVDom, container: HTMLElement, profile: { [key: string]: any } = {}): void {
	const nodeName: string = container.nodeName.toLowerCase()
	/**
	 * 创建当前渲染应用对应的 fiber 树的根 fiber 节点
	 * 		该 fiber 节点将对应 container DOM 节点
	 * 		其第一个子节点为 <App /> 函数对应的 fiber 节点
	 */
	const rootFiber: TFiberNode = generateFiberStructData({
		type: nodeName,
		props: {
			children: [element],
		},
		stateNode: container,
		dirty: true,
		/**
		 * 当前 fiber 的索引编号, 保证值与该 fiber 在 rootFiberList 中的位置索引一致
		 */
		index: ++renderIndex,
		root: true,
		queueUp: false,
	})
	rootFiber.triggerUpdate = true

	const rootFiberIndex: number = rootFiber.index as number

	__RTP__.profileList.push({ ...renderProfile, ...profile })
	__RTP__.rootFiberList.push(rootFiber)
	__RTP__.taskGroupQueue[rootFiberIndex] = []
	if (__RTP__.globalFiberRoot && !__RTP__.globalFiberRoot.current) {
		__RTP__.globalFiberRoot.current = rootFiber
		__RTP__.nextWorkUnitFiber = rootFiber

		/**
		 * 以异步调度或同步调度方式执行
		 */
		if (__RTP__.profileList[rootFiberIndex].async) {
			window.requestIdleCallback(initAsyncWorkLoop(), { timeout: globalConfig.requestIdleCallbackTimeout })
		} else {
			initSyncWorkLoop()()
		}
	}
}
