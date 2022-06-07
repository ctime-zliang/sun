import { TVDom } from '../types/vdom.types'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode, TRootFiberNode } from '../types/fiber.types'

/**
 * @description 创建初始 vDom 结构体数据
 * @function generateInitialVDOMStructData
 * @param {string} type HTML DOM tagName
 * @param {object} props HTML DOM vDom 定义属性
 * @return {TVDom}
 */
export function generateInitialVDOMStructData(type: string, props: { [key: string]: any }): TVDom {
	return {
		type,
		props,
		children: [],
		__classOf: typeof type,
	}
}

/**
 * @description 创建初始 Fiber 结构体数据
 * @function generateInitialFiberStructData
 * @return {TFiberNode}
 */
export function generateInitialFiberStructData(): TFiberNode {
	return {
		/* 
			FunctionComponent = 函数本身
			ClassComponent = class
			HostComponent = DOM节点 tagName 
		*/
		type: null, // 标记当前 Fiber 节点的类型
		elementType: undefined, // 标记当前 Fiber 节点对应的 DOM 节点类型
		stateNode: null, // 当前 Fiber 节点对应的 DOM
		props: {}, // fiber 节点的 vDom 属性
		child: null, // fiber 节点的第一个子节点 fiber
		parent: null, // fiber 节点的返回节点(父节点)
		current: null,
		sibling: null, // fiber 节点的下一个兄弟节点
		alternate: null, // 当前 fiber 节点在更新前的上一轮 fiber 节点对象
		effectTag: ENUM_EFFECT_TAG.NO_EFFECT, // fiber 节点的更新状态
		key: undefined,
		dirty: false, // 是否需要更新 fiber 节点
		/* ... */
		hooks: [], // hooks
	}
}

/**
 * @description 创建适用于非根节点的 Fiber 结构体数据
 * @function generateInitialFiberStructData
 * @param {any} args 满足 TFiberNode 节点的配置项
 * @return {TFiberNode}
 */
export function generateFiberStructData(args: any = {}): TFiberNode {
	const defaults: TFiberNode = generateInitialFiberStructData()
	return {
		...defaults,
		...args,
	}
}

/**
 * @description 创建适用非根节点的 Fiber 结构体数据
 * @function generateRootFiberStructData
 * @return {TFiberNode}
 */
export function generateRootFiberStructData(): TFiberNode {
	return {
		...generateInitialFiberStructData(),
		current: null,
		root: true,
		index: -1,
	}
}

/**
 * @description 获取根 Fiber 节点
 * @function generateRootFiberStructData
 * @param {TFiberNode} fiber fiber 节点
 * @return {TFiberNode}
 */
export function getRootFiber(fiber: TFiberNode): TRootFiberNode {
	let rootFiber: TFiberNode = fiber
	while (!rootFiber.root) {
		rootFiber = rootFiber.parent as TFiberNode
	}
	return rootFiber as TRootFiberNode
}

/**
 * @description 判断是否是需要新建的节点
 * @function isNewly
 * @param {any} oldObj 旧节点属性
 * @param {any} newObj 新节点属性
 * @return {function}
 */
export function isNewly(oldObj: { [key: string]: any }, newObj: { [key: string]: any }): (key: string) => boolean {
	return (key: string): boolean => {
		return oldObj[key] !== newObj[key]
	}
}

/**
 * @description 判断是否是已存在可复用的节点
 * @function isOld
 * @param {any} oldObj 旧节点属性
 * @param {any} newObj 新节点属性
 * @return {function}
 */
export function isOld(oldObj: { [key: string]: any }, newObj: { [key: string]: any }): (key: string) => boolean {
	return (key: string): boolean => {
		return !(key in newObj)
	}
}

/**
 * @description 判断是否是 HTML 属性
 * @function isProperty
 * @param {string} key 属性名称
 * @return {boolean}
 */
export function isProperty(key: string): boolean {
	return !['children'].includes(key) && !(key[0] === 'o' && key[1] === 'n')
}

/**
 * @description 判断是否是 HTML 系统事件
 * @function isSystemEvent
 * @param {string} key 属性名称
 * @return {boolean}
 */
export function isSystemEvent(key: string): boolean {
	return key[0] === 'o' && key[1] === 'n'
}

/**
 * @description 判断是否是正常的 Fiber 节点
 * @function isSystemEvent
 * @param {TFiberNode} fiber fiber 节点
 * @return {boolean}
 */
export function isApprovedComponent(fiber: TFiberNode): boolean {
	return fiber.type != null || typeof fiber.type != 'undefined'
}

/**
 * @description 判断是否是函数组件
 * @function isSystemEvent
 * @param {TFiberNode} fiber fiber 节点
 * @return {boolean}
 */
export function isFunctionComponent(fiber: TFiberNode): boolean {
	return !!(fiber && fiber.type && fiber.type instanceof Function)
}

/**
 * @description 同步阻塞
 * @function syncBlock
 * @param {number} delay 阻塞时长
 * @return {void}
 */
export function syncBlock(delay: number = 1000): void {
	const end: number = new Date().getTime() + delay
	let i: number = 0
	while (new Date().getTime() < end) {
		++i
	}
}
