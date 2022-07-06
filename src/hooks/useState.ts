import { TFiberNode } from '../types/fiber.types'
import { TUseStateHookStruct, TUseStateHook } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { generateFiberStructData, getRootFiber } from '../utils/utils'
import { getHookItem } from './hook'
import { initSyncWorkLoop } from '../lib/scheduler'

export function useState(initValue: any): TUseStateHook {
	const oldHookOfCompt: TUseStateHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseStateHookStruct
	const hook: TUseStateHookStruct = {
		rootFiber: getRootFiber(__RTCP__.wipFiberOfNowFunctionCompt as TFiberNode),
		nowFiber: __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode,
		/* ... */
		useState: true,
		state: oldHookOfCompt ? oldHookOfCompt.state : initValue,
		queue: [],
	}
	const actions: Array<(a?: any) => void> = oldHookOfCompt ? oldHookOfCompt.queue : []

	for (let i: number = 0; i < actions.length; i++) {
		if (actions[i] instanceof Function) {
			hook.state = actions[i](hook.state)
			continue
		}
		hook.state = actions[i]
	}

	const setState: (action: any) => void = (action: any): void => {
		hook.queue.push(action)
		hook.nowFiber.triggerUpdate = true
		/**
		 * 重新创建 <App /> 应用的根 fiber 节点
		 */
		const newRootFiber: TFiberNode = generateFiberStructData({
			stateNode: hook.rootFiber.stateNode,
			type: hook.rootFiber.type,
			props: hook.rootFiber.props,
			alternate: hook.rootFiber,
			dirty: true,
			/**
			 * 保留索引值
			 */
			index: hook.rootFiber.index,
			root: true,
		})
		__RTP__.rootFiberList.splice(hook.rootFiber.index as number, 1, newRootFiber)
		/**
		 * 将重建的 <App /> 应用的根 fiber 节点标记引用
		 * 在下一次执行 window.requestIdleCallback 回调时将重新从根 fiber 节点处理需要更新的应用
		 */
		__RTP__.globalFiberRoot.current = newRootFiber
		__RTP__.nextWorkUnitFiber = newRootFiber
		if (!__RTP__.profileList[newRootFiber.index as number].async) {
			initSyncWorkLoop()()
		}
	}

	hook.nowFiber.hooks.push(hook)
	__RTCP__.hookIndexOfNowFunctionCompt++

	return [hook.state, setState]
}
