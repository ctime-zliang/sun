import { TFiberNode } from './fiber.types'

export type TAllHooksStruct = TUseStateHookStruct | TUseEffectHookStruct | TUseMemoHookStruct | TUseCallbackHookStruct

export type TUseStateHook = [any, (action: any) => void]
export type TUseStateHookStruct = {
	rootFiber: TFiberNode
	nowFiber: TFiberNode
	useState: boolean
	state: any
	setState: (a: any) => void
}

export type TUseEffectHookStruct = {
	useEffect: boolean
	isUpdated: boolean
	dependences: Array<any> | undefined
	callback?: Function
	returnCallback?: Function
}

export type TUseMemoHookStruct = {
	useMemo: boolean
	isUpdated: boolean
	dependences: Array<any> | undefined
	callback?: Function
	returnValue?: any
}

export type TUseCallbackHookStruct = {
	useCallback: boolean
	isUpdated: boolean
	dependences: Array<any> | undefined
	callback?: Function
	returnCallback?: any
}
