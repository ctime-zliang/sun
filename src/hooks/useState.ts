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
			/**
			 * 将每次 setState 的执行保存到队列中
			 *
			 * 在性能较好的高刷设备中, 某些情况下尽管可以尽快地连续执行 setState(例如快速点击按执行 setState)
			 * 但仍存在浏览器往这些连续执行的 setState 之间穿插进若干 microtask 的情况
			 *
			 * 因此, 在通过一次 microtask 开启一轮 Reconciliation 且还未结束时, 需要保存在此期间被执行的 setState
			 * 在每一轮 Reconciliation 结束后, 会尝试调用执行队列(不为空时)的最后一个 setState 调用
			 * 并在该队列清空后执行 commit 操作, 以保证视图显示与状态更新同步(防止"状态撕裂")
			 */
			__RTP__.taskQueue.push({
				fiber: hookItem.rootFiber,
				task: (rootFiber: TFiberNode): void => {
					initStartRootFiber(rootFiber)
				},
			})
			if (!hookItem.rootFiber.queueUp) {
				hookItem.rootFiber.queueUp = true
				Promise.resolve().then(() => {
					const lastTaskItem: T_TASKQUEUE_ITEM = __RTP__.taskQueue.pop() as T_TASKQUEUE_ITEM
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
