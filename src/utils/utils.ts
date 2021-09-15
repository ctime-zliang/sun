import { TFiber } from 'types/fiber.type'
import { RECONCILE_EFFECT_TYPE } from '../config/config'

export function generateStructVDOM(type: string, props: { [key: string]: any }) {
	return {
		type,
		props,
	}
}

/*
	root = {
		root: boolean
	}
 */
export function generateStructFiber(args: { [key: string]: any } = {}, root: { [key: string]: any } = {}) {
	const defaults = {
		/* 
			VDOM 属性/fiber 链表节点属性 
		*/
		/* 
			FunctionComponent = 函数本身
			ClassComponent = class
			HostComponent = DOM节点 tagName 
		*/
		type: null,
		elementType: null,
		stateNode: null,
		props: null,
		child: null,
		parent: null,
		sibling: null,
		alternate: null,
		effectTag: RECONCILE_EFFECT_TYPE.NO_EFFECT,
		key: null,
		dirty: false,
		/* 
			hooks 
		*/
		hooks: [],
	}
	return {
		...defaults,
		...args,
		...root,
	}
}

export function generateStructFiberRoot(args: { [key: string]: any } = {}) {
	const defaults = {
		current: null,
	}
	return {
		...defaults,
		...args,
	}
}

export function getRootFiber(fiber: TFiber) {
	let rootFiber = fiber
	while (!rootFiber.root) {
		rootFiber = rootFiber.parent
	}
	return rootFiber
}

export function isNewly(oldObj: { [key: string]: any }, newObj: { [key: string]: any }) {
	return (key: string) => {
		return oldObj[key] !== newObj[key]
	}
}

export function isOld(oldObj: { [key: string]: any }, newObj: { [key: string]: any }) {
	return (key: string) => {
		return !(key in newObj)
	}
}

export function isProperty(key: string) {
	return !['children'].includes(key) && !(key[0] === 'o' && key[1] === 'n')
}

export function isSystemEvent(key: string) {
	return key[0] === 'o' && key[1] === 'n'
}

export function isApprovedComponent(fiber: TFiber) {
	return fiber.type != null || typeof fiber.type != 'undefined'
}

export function isFunctionComponent(fiber: TFiber) {
	return fiber && fiber.type && fiber.type instanceof Function
}

export function syncBlock(delay = 1000) {
	const end = new Date().getTime() + delay
	while (new Date().getTime() < end) {}
}
