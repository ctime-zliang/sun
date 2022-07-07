import { TExtendHTMLDOMElment } from './dom.types'
import { TAllHooksStruct } from './hooks.types'
import { TVDom } from './vdom.types'

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
	root?: boolean
	index?: number
	current?: TFiberNode | null
	__chm: boolean
	__dchm: boolean
}
