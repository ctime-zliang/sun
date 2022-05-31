import { TVdom } from '../types/vdom.types'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode, TRootFiberNode } from '../types/fiber.types'

/**
 * @description 创建初始 VDOM 结构体数据
 * @function generateInitialVDOMStructData
 * @param {string} type HTML DOM tagName
 * @param {object} props HTML DOM VDOM 定义属性
 * @return {TVdom}
 */
export function generateInitialVDOMStructData(type: string, props: { [key: string]: any }): TVdom {
	return {
		type,
		props,
		children: [],
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
		type: null,
		elementType: undefined,
		stateNode: null,
		props: {},
		child: null,
		parent: null,
		current: null,
		sibling: null,
		alternate: null,
		effectTag: ENUM_EFFECT_TAG.NO_EFFECT,
		key: undefined,
		dirty: false,
		/* ... */
		hooks: [],
	}
}

/**
 * @description 创建适用于非根节点的 Fiber 结构体数据
 * @function generateInitialFiberStructData
 * @return {TFiberNode}
 */
export function generateFiberStructData(args: any = {}, root: any = {}): TFiberNode {
	const defaults: TFiberNode = generateInitialFiberStructData()
	return {
		...defaults,
		...args,
		...root,
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
 * @return {function}
 */
export function isNewly(oldObj: { [key: string]: any }, newObj: { [key: string]: any }): (key: string) => boolean {
	return (key: string) => {
		return oldObj[key] !== newObj[key]
	}
}

/**
 * @description 判断是否是已存在可复用的节点
 * @function isNewly
 * @return {function}
 */
export function isOld(oldObj: { [key: string]: any }, newObj: { [key: string]: any }): (key: string) => boolean {
	return (key: string) => {
		return !(key in newObj)
	}
}

/**
 * @description 判断是否是 HTML 属性
 * @function isProperty
 * @return {boolean}
 */
export function isProperty(key: string): boolean {
	return !['children'].includes(key) && !(key[0] === 'o' && key[1] === 'n')
}

/**
 * @description 判断是否是 HTML 系统事件
 * @function isSystemEvent
 * @return {boolean}
 */
export function isSystemEvent(key: string): boolean {
	return key[0] === 'o' && key[1] === 'n'
}

/**
 * @description 判断是否是正常的 Fiber 节点
 * @function isSystemEvent
 * @return {boolean}
 */
export function isApprovedComponent(fiber: TFiberNode): boolean {
	return fiber.type != null || typeof fiber.type != 'undefined'
}

/**
 * @description 判断是否是函数组件
 * @function isSystemEvent
 * @return {boolean}
 */
export function isFunctionComponent(fiber: TFiberNode): boolean {
	return !!(fiber && fiber.type && fiber.type instanceof Function)
}

/**
 * @description 同步阻塞
 * @function syncBlock
 * @return {void}
 */
export function syncBlock(delay: number = 1000): void {
	const end: number = new Date().getTime() + delay
	let i: number = 0
	while (new Date().getTime() < end) {
		++i
	}
}
