import { TFiberNode } from './fiber.types'

export type TUseStateHook = [any, (action: any) => void]
export type TUseStateHookStruct = {
	rootFiber: TFiberNode
	nowFiber: TFiberNode
	useState: boolean
	state: any
	queue: Array<any>
}

export type TUseEffectHookStruct = {
	nowFiber: TFiberNode
	useEffect: boolean
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: () => any
	returnCallback?: () => any
}

export type TUseMemoHookStruct = {
	nowFiber: TFiberNode
	useMemo: boolean
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: () => any
	returnValue?: any
}
