export function generateStructVDOM(type, props) {
	return {
		type,
		props,
	}
}

export function generateStructFiber(args) {
	const defaults = {
		/* VDOM 属性 */
		type: null,
		dom: null,
		props: null,
		/* fiber 链表属性 */
		child: null,
		parent: null,
		sibling: null,
		alternate: null,
		effectTag: null,
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
	return !['children'].includes(key)
}

export function isSystemEvent(key) {
	return key[0] === 'o' && key[1] === 'n'
	// return key.startsWith('on')
}

export function syncBlock(delay = 1000) {
	const end = new Date().getTime() + delay
	while (new Date().getTime() < end) {}
}
