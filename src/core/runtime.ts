import { TAllHooksStruct } from '../types/hooks.types'
import { TFiberNode, TFiberRootNode, TTASKQUEUE_ITEM } from '../types/fiber.types'

type T__RTP__ = {
	globalFiberRoot: TFiberRootNode
	rootFiberList: Array<TFiberNode>
	profileList: Array<{ [key: string]: any }>
	taskGroupQueue: Array<Array<TTASKQUEUE_ITEM>>
	taskGroupIndex: number
	nextWorkUnitFiber: TFiberNode
	mountedHooksCache: Array<TAllHooksStruct>
	unmountedHooksCache: Array<TAllHooksStruct>
	updateRangeStartFiber: TFiberNode | null
}
export const __RTP__: T__RTP__ = Object.create({
	globalFiberRoot: null,
	rootFiberList: [],
	profileList: [],
	taskGroupQueue: [],
	taskGroupIndex: -1,
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
