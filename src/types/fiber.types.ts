import { TExtendHTMLDOMElment } from './dom.types'
import { TUseEffectHookStruct, TUseStateHookStruct } from './hooks.types'
import { TVDom } from './vdom.types'

export type TFiberNode = {
	// FunctionComponent: Function
	// ClassComponent: Function,
	// HostComponent: any
	/* ... */
	type: Function | string | null
	props: TVDom | any
	/* ... */
	// elementType: string | undefined
	stateNode: TExtendHTMLDOMElment | null
	child: TFiberNode | null
	parent: TFiberNode | null
	sibling: TFiberNode | null
	alternate: TFiberNode | null
	effectTag: string
	key: string | undefined
	dirty: boolean
	/* ... */
	hooks: Array<TUseStateHookStruct | TUseEffectHookStruct>
	/* ... */
	root?: boolean
	index?: number
	current?: TFiberNode | null
	cacheHook?: boolean
}
