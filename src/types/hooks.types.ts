export type TUseStateHook = [any, (action: any) => void]

export type TUseStateHookStruct = {
	useState: boolean
	state: any
	queue: Array<any>
}

export type TUseStateHookAction = Array<() => void>

export type TUseEffectHookStruct = {
	useEffect: boolean
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: () => any
	returnCallback?: () => any
}
