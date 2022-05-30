import { TFiberNode } from '../types/fiber.types'

export const __RUNTIME_PROFILE___ = {
	fiberRoot: null,
	rootFiber: null,
	rootFiberList: [] as Array<TFiberNode>,
	nextWorkUnitFiber: null,
}

export const __RUNTIME_COMPT_PROFILE___ = {
	workInProgressFiberOfNowCompt: null,
	hookIndexOfNowCompt: 0,
}
