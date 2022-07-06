import { TUseEffectHookStruct, TUseMemoHookStruct, TUseStateHookStruct } from '../types/hooks.types'
import { TFiberNode } from '../types/fiber.types'

type T__RTP__ = {
	globalFiberRoot: TFiberNode
	rootFiberList: Array<TFiberNode>
	profileList: Array<{ [key: string]: any }>
	nextWorkUnitFiber: TFiberNode
	mountedHooksCache: Array<TUseStateHookStruct | TUseEffectHookStruct | TUseMemoHookStruct>
	unmountedHooksCache: Array<TUseStateHookStruct | TUseEffectHookStruct | TUseMemoHookStruct>
	updateRangeStartFiber: TFiberNode | null
}
export const __RTP__: T__RTP__ = Object.create({
	globalFiberRoot: null,
	rootFiberList: [],
	profileList: [],
	nextWorkUnitFiber: null,
	mountedHooksCache: [],
	unmountedHooksCache: [],
	updateRangeStartFiber: null,
})

type T__RTCP__ = {
	hookIndexOfNowFunctionCompt: number
	wipFiberOfNowFunctionCompt: TFiberNode | null
}
export const __RTCP__: T__RTCP__ = Object.create({
	hookIndexOfNowFunctionCompt: -1,
	wipFiberOfNowFunctionCompt: null,
})
