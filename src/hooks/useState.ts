import { TFiberNode } from '../types/fiber.types'
import { TUseStateHookStruct, TUseStateHook } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { generateFiberStructData, getRootFiber } from '../utils/utils'
import { getHookItem } from './hook'
import { initSyncWorkLoop } from '../lib/scheduler'

export function useState(initValue: any): TUseStateHook {
	/**
	 * 获取当前 hook(s) 所在的函数组件对应的 fiber 节点
	 */
	const componentFiber: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode
	const rootFiber: TFiberNode = getRootFiber(componentFiber as TFiberNode)
	const oldHookOfCompt: TUseStateHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseStateHookStruct
	const hook: TUseStateHookStruct = {
		useState: true,
		state: oldHookOfCompt ? oldHookOfCompt.state : initValue,
		queue: [],
	}
	const actions: Array<() => void> = oldHookOfCompt ? oldHookOfCompt.queue : []

	actions.forEach((item: Function): void => {
		if (item instanceof Function) {
			hook.state = item(hook.state)
			return
		}
		hook.state = item
	})

	const setState: (action: any) => void = (action: any): void => {
		hook.queue.push(action)
		componentFiber.triggerUpdate = true
		/**
		 * 重新创建 <App /> 应用的根 fiber 节点
		 */
		const newRootFiber: TFiberNode = generateFiberStructData({
			stateNode: rootFiber.stateNode,
			type: rootFiber.type,
			props: rootFiber.props,
			alternate: rootFiber,
			dirty: true,
			/**
			 * 保留索引值
			 */
			index: rootFiber.index,
			root: true,
		})
		__RTP__.rootFiberList.splice(rootFiber.index as number, 1, newRootFiber)
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

	componentFiber.hooks.push(hook)
	__RTCP__.hookIndexOfNowFunctionCompt++

	return [hook.state, setState]
}
