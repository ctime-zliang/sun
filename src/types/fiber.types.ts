import { TUseStateHookStructData } from './hooks.types'

export type TFiberNode = {
	// FunctionComponent: Function
	// ClassComponent: Function,
	// HostComponent: any
	/* ... */
	type: Function | string | null
	elementType: string | undefined
	stateNode: HTMLElement | Text | null
	props: { [key: string]: any }
	child: TFiberNode | null
	parent: TFiberNode | null
	sibling: TFiberNode | null
	current: TFiberNode | null
	alternate: TFiberNode | null
	effectTag: string
	key: string | undefined
	dirty: boolean
	/* ... */
	hooks: Array<TUseStateHookStructData>
	/* ... */
	root?: boolean
	index?: number
}

export type TRootFiberNode = {
	// FunctionComponent: Function
	// ClassComponent: Function,
	// HostComponent: any
	/* ... */
	type: Function | string | null
	elementType: string | undefined
	stateNode: HTMLElement | Text | null
	props: { [key: string]: any }
	child: TFiberNode | null
	parent: TFiberNode | null
	sibling: TFiberNode | null
	current: TFiberNode | null
	alternate: TFiberNode | null
	effectTag: string
	key: string | undefined
	dirty: boolean
	/* ... */
	hooks: Array<TUseStateHookStructData>
	/* ... */
	root: boolean
	index: number
}
