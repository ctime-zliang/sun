import { TExtendHTMLDOMElment } from './dom.types'
import { TAllHooksStruct } from './hooks.types'
import { TVDom } from './vdom.types'

export type TTASKQUEUE_ITEM = {
	count: number
}

export type TFiberRootNode = {
	current: TFiberNode | null | undefined
}

export type TFiberNode = {
	// FunctionComponent: Function
	// ClassComponent: Function,
	// HostComponent: any
	type: Function | string | null
	props: TVDom | any
	// elementType: string | undefined
	stateNode: TExtendHTMLDOMElment | null
	child: TFiberNode | null
	parent: TFiberNode | null
	sibling: TFiberNode | null
	alternate: TFiberNode | null
	effectTag: string
	key: string | undefined
	dirty: boolean
	triggerUpdate: boolean
	hooks: Array<TAllHooksStruct>
	effectCachedMounted: boolean
	effectCachedUnmounted: boolean
	/* ... */
	root?: boolean
	index?: number
	current?: TFiberNode | null
	queueUp?: boolean
}
