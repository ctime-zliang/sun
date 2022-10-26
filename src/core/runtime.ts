import { TEffectStruct, TUseEffectHookStruct, TUseLayoutEffectHookStruct } from '../types/hooks.types'
import { TFiberNode, TFiberRootNode, TTASKQUEUE_ITEM } from '../types/fiber.types'

type T__RTP__ = {
	globalFiberRoot: TFiberRootNode
	rootFiberList: Array<TFiberNode>
	profile: { [key: string]: any }
	taskGroupQueue: Array<TTASKQUEUE_ITEM>
	taskGroupIndex: number
	nextWorkUnitFiber: TFiberNode
	effectCacheOnMounted: Array<TUseEffectHookStruct>
	layoutEffectCacheOnMounted: Array<TUseLayoutEffectHookStruct>
	effectCacheOnUnmounted: Array<TEffectStruct>
	updateRangeStartFiber: TFiberNode | null
}
export const __RTP__: T__RTP__ = Object.create({
	globalFiberRoot: null,
	rootFiberList: [],
	profile: {},
	taskGroupQueue: [],
	taskGroupIndex: -1,
	nextWorkUnitFiber: null,
	effectCacheOnMounted: [],
	layoutEffectCacheOnMounted: [],
	effectCacheOnUnmounted: [],
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
