import { TFiberNode } from '../types/fiber.types'

export const __RUNTIME_PROFILE___ = {
	fiberRoot: null as TFiberNode | null,
	rootFiber: null as TFiberNode | null,
	rootFiberList: [] as Array<TFiberNode>,
	nextWorkUnitFiber: null as TFiberNode | null,
}

export const __RUNTIME_COMPT_PROFILE___ = {
	workInProgressFiberOfNowCompt: null as TFiberNode | null,
	hookIndexOfNowCompt: 0,
}
