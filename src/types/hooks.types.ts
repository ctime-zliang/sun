import { TFiberNode } from './fiber.types'

export type TAllHooksStruct = TUseStateHookStruct | TUseEffectHookStruct | TUseMemoHookStruct

export type TUseStateHook = [any, (action: any) => void]
export type TUseStateHookStruct = {
	rootFiber: TFiberNode
	nowFiber: TFiberNode
	useState: boolean
	state: any
	queue: Array<any>
	// setState: (a: any) => any
}

export type TUseEffectHookStruct = {
	nowFiber: TFiberNode
	useEffect: boolean
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: Function
	returnCallback?: Function
}

export type TUseMemoHookStruct = {
	nowFiber: TFiberNode
	useMemo: boolean
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: Function
	returnValue?: any
}
