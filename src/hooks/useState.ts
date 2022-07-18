import { TFiberNode } from '../types/fiber.types'
import { TUseStateHookStruct, TUseStateHook } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getRootFiber } from '../utils/utils'
import { getHookItem } from './hook'
import { initStartRootFiber } from '../lib/scheduler'

function createHookItem(rootFiber: TFiberNode, nowFiber: TFiberNode, initValue: any): TUseStateHookStruct {
	const hookItem: TUseStateHookStruct = {
		rootFiber,
		nowFiber,
		/* ... */
		useState: true,
		state: initValue,
		queue: [],
		setState: () => undefined,
	}
	return hookItem
}

export function useState(initValue: any): TUseStateHook {
	const oldHookOfCompt: TUseStateHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseStateHookStruct
	const nowFiber: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode
	const rootFiber: TFiberNode = getRootFiber(__RTCP__.wipFiberOfNowFunctionCompt as TFiberNode)
	if (!oldHookOfCompt) {
		nowFiber.hooks.push(createHookItem(rootFiber, __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode, initValue))
	}
	const hooksLen: number = nowFiber.hooks.length
	const hookItem: TUseStateHookStruct = nowFiber.hooks[hooksLen - 1] as TUseStateHookStruct
	if (!oldHookOfCompt) {
		hookItem.setState = (action: any): void => {
			if (action instanceof Function) {
				hookItem.state = action.call(undefined, hookItem.state)
			} else {
				hookItem.state = action
			}
			hookItem.nowFiber.triggerUpdate = true
			if (!hookItem.rootFiber.queueUp) {
				hookItem.rootFiber.queueUp = true
				Promise.resolve().then(() => {
					initStartRootFiber(hookItem.rootFiber)
				})
			}
		}
	} else {
		hookItem.rootFiber = rootFiber
		hookItem.nowFiber = nowFiber
	}
	__RTCP__.hookIndexOfNowFunctionCompt++

	return [hookItem.state, hookItem.setState]
}
