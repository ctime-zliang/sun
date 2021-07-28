export function generateStructVDOM(type, props) {
	return {
		type,
		props,
	}
}

export function generateStructFiber(dom = null, type = null, props = null, parent = null, child = null, sibling = null) {
	return {
		type,
		dom,
		props,
		child,
		parent,
		sibling,
	}
}


export function syncBlock(delay = 1000) {
    const end = new Date().getTime() + delay
    while (new Date().getTime() < end) {}
}