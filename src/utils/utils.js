export function generateStructVDOM(elementType, props) {
	return {
		elementType,
		props,
	}
}

export function generateStructFiber(args) {
	const defaults = {
		/* VDOM 属性 */
		elementType: null,
		stateNode: null,
		props: null,
		/* fiber 链表属性 */
		child: null,
		parent: null,
		sibling: null,
		alternate: null,
		effectTag: null,
		/* hooks */
		hooks: [],
	}
	return {
		...defaults,
		...args,
	}
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
	return fiber.elementType != null || typeof fiber.elementType != 'undefined'
}

export function isFunctionComponent(fiber) {
	return fiber && fiber.elementType && fiber.elementType instanceof Function
}

export function syncBlock(delay = 1000) {
	const end = new Date().getTime() + delay
	while (new Date().getTime() < end) {}
}
