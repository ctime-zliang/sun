import { TFiberNode } from '../types/fiber.types'

type T__RUNTIME_PROFILE___ = {
	globalFiberRoot: TFiberNode | undefined
	rootFiberList: Array<TFiberNode>
	nextWorkUnitFiber: TFiberNode | undefined
}
export const __RUNTIME_PROFILE___: T__RUNTIME_PROFILE___ = {
	globalFiberRoot: undefined,
	rootFiberList: [],
	nextWorkUnitFiber: undefined,
}

type T__RUNTIME_COMPT_PROFILE___ = {
	hookIndexOfNowFunctionCompt: number
	wipFiberOfNowFunctionCompt?: TFiberNode
}
export const __RUNTIME_COMPT_PROFILE___: T__RUNTIME_COMPT_PROFILE___ = {
	hookIndexOfNowFunctionCompt: 0,
	wipFiberOfNowFunctionCompt: undefined,
}
