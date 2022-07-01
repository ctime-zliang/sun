import { TFiberNode } from '../types/fiber.types'

type T__RTP__ = {
	globalFiberRoot: TFiberNode
	rootFiberList: Array<TFiberNode>
	profileList: Array<{ [key: string]: any }>
	nextWorkUnitFiber: TFiberNode
	mountedHooksCache: Array<() => any>
	unmountedHooksCache: Array<() => any>
}
export const __RTP__: T__RTP__ = Object.create({
	globalFiberRoot: undefined,
	rootFiberList: [],
	profileList: [],
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
