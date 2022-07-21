import { TFiberNode, TTASKQUEUE_ITEM } from '../types/fiber.types'
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
		queue: [],
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
			hookItem.queue.push(action)
			if (action instanceof Function) {
				hookItem.state = action.call(undefined, hookItem.state)
			} else {
				hookItem.state = action
			}
			hookItem.nowFiber.triggerUpdate = true
			/**
			 * 将每次 setState 的执行保存到队列中
			 *
			 * 在 Reconciliation + Commit 执行期间被执行的 setState 将插入到队列中
			 * 在每轮 Reconciliation + Commit 执行结束后, 会尝试调用逐一执行队列(不为空时)中的 setState 调用
			 */
			const rootFiberIndex: number = hookItem.rootFiber.index || 0
			const taskGroup: Array<TTASKQUEUE_ITEM> = __RTP__.taskGroupQueue[rootFiberIndex]
			taskGroup.push({
				task: (rootFiber: TFiberNode): void => {
					initStartRootFiber(rootFiber)
				},
			})
			/**
			 * 仅在空闲状态下开启一轮 Reconciliation + Commit 更新过程
			 * 		同时满足:
			 * 			1. 任意 <App /> 顶层组件没有被加入到 Reconciliation 过程中
			 * 			2. 没有正在处理的 Reconciliation + Commit 过程
			 */
			if (!hookItem.rootFiber.queueUp && !__RTP__.nextWorkUnitFiber) {
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
