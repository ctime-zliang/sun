import { TFiberNode } from '../types/fiber.types'

type T__RUNTIME_PROFILE___ = {
	globalFiberRoot: TFiberNode
	rootFiberList: Array<TFiberNode>
	nextWorkUnitFiber: TFiberNode
	mountedHooksCache: Array<() => any>
	unmountedHooksCache: Array<() => any>
}
export const __RUNTIME_PROFILE___: T__RUNTIME_PROFILE___ = Object.create({
	globalFiberRoot: undefined,
	rootFiberList: [],
	nextWorkUnitFiber: undefined,
	mountedHooksCache: [],
	unmountedHooksCache: [],
})

type T__RUNTIME_COMPT_PROFILE___ = {
	hookIndexOfNowFunctionCompt: number
	wipFiberOfNowFunctionCompt: TFiberNode
}
export const __RUNTIME_COMPT_PROFILE___: T__RUNTIME_COMPT_PROFILE___ = Object.create({
	hookIndexOfNowFunctionCompt: 0,
	wipFiberOfNowFunctionCompt: undefined,
})
