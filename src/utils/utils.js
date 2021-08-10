import { RECONCILE_EFFECT_TYPE } from '../config/config'

export function generateStructVDOM(type, props) {
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
export function generateStructFiber(args, root = {}) {
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

export function generateStructFiberRoot(args) {
	const defaults = {
		current: null,
	}
	return {
		...defaults,
		...args,
	}
}

export function getRootFiber(fiber) {
	let rootFiber = fiber
	while (!rootFiber.root) {
		rootFiber = rootFiber.parent
	}
	return rootFiber
}

export function isNewly(oldObj, newObj) {
	return key => {
		return oldObj[key] !== newObj[key]
	}
}

export function isOld(oldObj, newObj) {
	return key => {
		return !(key in newObj)
	}
}

export function isProperty(key) {
	return !['children'].includes(key) && !(key[0] === 'o' && key[1] === 'n')
}

export function isSystemEvent(key) {
	return key[0] === 'o' && key[1] === 'n'
}

export function isApprovedComponent(fiber) {
	return fiber.type != null || typeof fiber.type != 'undefined'
}

export function isFunctionComponent(fiber) {
	return fiber && fiber.type && fiber.type instanceof Function
}

export function syncBlock(delay = 1000) {
	const end = new Date().getTime() + delay
	while (new Date().getTime() < end) {}
}
