import { TFiberNode } from '../types/fiber.types'
import { TUseStateHookStruct, TUseStateHook } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getRootFiber } from '../utils/utils'
import { getHookItem } from './hook'
import { initStartRootFiber } from '../lib/scheduler'

export function useState(initValue: any): TUseStateHook {
	const oldHookOfCompt: TUseStateHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseStateHookStruct
	const rootFiber: TFiberNode = getRootFiber(__RTCP__.wipFiberOfNowFunctionCompt as TFiberNode)
	const hook: TUseStateHookStruct = {
		rootFiber,
		nowFiber: __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode,
		/* ... */
		useState: true,
		state: oldHookOfCompt ? oldHookOfCompt.state : initValue,
		queue: oldHookOfCompt ? oldHookOfCompt.queue : [],
	}

	hook.nowFiber.hooks.push(hook)
	__RTCP__.hookIndexOfNowFunctionCompt++

	const setState: (action: any) => void = (action: any): void => {
		if (action instanceof Function) {
			hook.state = action.call(undefined, hook.state)
		} else {
			hook.state = action
		}
		hook.nowFiber.triggerUpdate = true
		// const rootFiberIndex: number = rootFiber.index as number
		// rootFiber.queueUp = __RTP__.rootFiberList[rootFiberIndex].queueUp
		if (!rootFiber.queueUp) {
			rootFiber.queueUp = true
			Promise.resolve().then(() => {
				initStartRootFiber(rootFiber)
			})
		}
	}

	return [hook.state, setState]
}
