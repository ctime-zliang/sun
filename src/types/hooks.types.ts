export type TUseStateHook = [any, (action: any) => void]

export type TUseStateHookStruct = {
	state: any
	queue: Array<any>
}

export type TUseStateHookAction = Array<() => void>

export type TUseEffectHookStruct = {
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: () => any
	returnCallback?: () => any
}
