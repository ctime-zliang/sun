export type TUseStateHook = [any, (action: any) => void]

export type TUseStateHookStructData = {
	state: any
	queue: Array<any>
}

export type TUseStateHookAction = Array<() => void>
