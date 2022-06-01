import { TFiberNode } from '../types/fiber.types'

type T__RUNTIME_PROFILE___ = {
	globalFiberRoot: TFiberNode | undefined
	rootFiber: TFiberNode | undefined
	rootFiberList: Array<TFiberNode>
	nextWorkUnitFiber: TFiberNode | undefined
}
export const __RUNTIME_PROFILE___: T__RUNTIME_PROFILE___ = {
	globalFiberRoot: undefined,
	rootFiber: undefined,
	rootFiberList: [],
	nextWorkUnitFiber: undefined,
}

type T__RUNTIME_COMPT_PROFILE___ = {
	hookIndexOfNowCompt: number
	workInProgressFiberOfNowCompt?: TFiberNode
}
export const __RUNTIME_COMPT_PROFILE___: T__RUNTIME_COMPT_PROFILE___ = {
	hookIndexOfNowCompt: 0,
	workInProgressFiberOfNowCompt: undefined,
}
