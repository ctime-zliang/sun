import { TFiberNode } from './fiber.types'

export type TUseStateHook = [any, (action: any) => void]
export type TUseStateHookStruct = {
	useState: boolean
	state: any
	rootFiber: TFiberNode
	nowFiber: TFiberNode
	queue: Array<any>
}

export type TUseEffectHookStruct = {
	useEffect: boolean
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: () => any
	returnCallback?: () => any
}

export type TUseMemoHookStruct = {
	useMemo: boolean
	isupdated: boolean
	dependences: Array<any> | undefined
	callback?: () => any
	returnValue?: any
}
