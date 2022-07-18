import { TFiberNode, T_TASKQUEUE_ITEM } from '../types/fiber.types'
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
	const hookItem: TUseStateHookStruct = nowFiber.hooks[__RTCP__.hookIndexOfNowFunctionCompt] as TUseStateHookStruct
	if (!oldHookOfCompt) {
		hookItem.setState = (action: any): void => {
			if (action instanceof Function) {
				hookItem.state = action.call(undefined, hookItem.state)
			} else {
				hookItem.state = action
			}
			hookItem.nowFiber.triggerUpdate = true
			__RTP__.taskQueue.push({
				fiber: hookItem.rootFiber,
				task: (rootFiber: TFiberNode): void => {
					initStartRootFiber(rootFiber)
				},
			})
			if (!hookItem.rootFiber.queueUp) {
				hookItem.rootFiber.queueUp = true
				window.setTimeout(() => {
					const lastTaskItem: T_TASKQUEUE_ITEM = __RTP__.taskQueue.shift() as T_TASKQUEUE_ITEM
					lastTaskItem.task(lastTaskItem.fiber)
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
