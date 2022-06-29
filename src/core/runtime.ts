import { TFiberNode } from '../types/fiber.types'

type T__RTP___ = {
	globalFiberRoot: TFiberNode
	rootFiberList: Array<TFiberNode>
	nextWorkUnitFiber: TFiberNode
	mountedHooksCache: Array<() => any>
	unmountedHooksCache: Array<() => any>
}
export const __RTP___: T__RTP___ = Object.create({
	globalFiberRoot: undefined,
	rootFiberList: [],
	nextWorkUnitFiber: undefined,
	mountedHooksCache: [],
	unmountedHooksCache: [],
})

type T__RTCP___ = {
	hookIndexOfNowFunctionCompt: number
	wipFiberOfNowFunctionCompt: TFiberNode
}
export const __RTCP___: T__RTCP___ = Object.create({
	hookIndexOfNowFunctionCompt: 0,
	wipFiberOfNowFunctionCompt: undefined,
})
