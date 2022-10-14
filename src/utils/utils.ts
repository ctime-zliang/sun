import { TVDom } from '../types/vdom.types'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'

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
		// 标记当前 Fiber 节点的类型
		// 对于 FunctionComponent, 即函数本身
		// 对于 ClassComponent, 即 class
		// 对于 HostComponent, 指 DOM 节点 tagName
		// 此项对应 React Fiber 设计中的 fiber.type
		type: null,
		// fiber 节点的 vDom 属性
		props: {},
		// 标记当前 Fiber 节点对应的 DOM 节点类型
		// elementType: undefined,
		// 当前 Fiber 节点对应的真实 DOM
		stateNode: null,
		// fiber 节点的第一个子节点 fiber
		child: null,
		// fiber 节点的返回节点(父节点)
		parent: null,
		// fiber 节点的下一个兄弟节点
		sibling: null,
		// 当前 fiber 节点在更新前的上一轮 fiber 节点对象
		alternate: null,
		// fiber 节点的更新状态
		effectTag: ENUM_EFFECT_TAG.NO_EFFECT,
		// 索引键
		key: undefined,
		// hooks
		hooks: [],
		// 是否需要更新 fiber 节点
		dirty: false,
		// 触发更新的标记位
		triggerUpdate: false,
		// 处于 commit 阶段在处理函数组件对应的 fiber 节点时是否已缓存其下的所有 hooks
		effectCachedMounted: false,
		// 处于 commit 阶段在处理函数组件对应的 fiber 节点时是否已缓存其下的所有 hooks
		// 针对需要删除的 fiber 节点
		effectCachedUnmounted: false,
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
 * @description 获取根 Fiber 节点
 * @function generateRootFiberStructData
 * @param {TFiberNode} fiber fiber 节点
 * @return {TFiberNode}
 */
export function getRootFiber(fiber: TFiberNode): TFiberNode {
	let rootFiber: TFiberNode = fiber
	while (!rootFiber.root) {
		rootFiber = rootFiber.parent as TFiberNode
	}
	return rootFiber
}

/**
 * @description 判断是否是新的属性
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
 * @description 判断是否是旧的属性
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
 * @description 判断是否存在属性
 * @function hasProperty
 * @param {any} obj 查询对
 * @param {string} key 查询键
 * @return {function}
 */
export function hasProperty(obj: { [key: string]: any }, key: string): boolean {
	return key in obj
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
 * @function isApprovedComponent
 * @param {TFiberNode} fiber fiber 节点
 * @return {boolean}
 */
export function isApprovedComponent(fiber: TFiberNode): boolean {
	return fiber.type != null || typeof fiber.type != 'undefined'
}

/**
 * @description 判断是否是函数组件
 * @function isFunctionComponent
 * @param {TFiberNode} fiber fiber 节点
 * @return {boolean}
 */
export function isFunctionComponent(fiber: TFiberNode): boolean {
	return !!(fiber.type && fiber.type instanceof Function)
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

/**
 * @description 数组扁平化
 * @function flatArray
 * @param {array} arr 需要扁平化的数组(通常是嵌套数组)
 * @return {array}
 */
export function flatArray(arr: Array<any>, res: Array<any> = []): Array<any> {
	res = res || []
	for (let i: number = 0; i < arr.length; i++) {
		const a: any = arr[i]
		if (Array.isArray(a)) {
			flatArray(a, res)
			continue
		}
		res.push(a)
	}
	return res
}
