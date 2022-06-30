import { TFiberNode } from '../types/fiber.types'
import { TUseStateHookStruct, TUseStateHook, TUseStateHookAction } from '../types/hooks.types'
import { __RTP___, __RTCP___ } from '../core/runtime'
import { generateFiberStructData, getRootFiber } from '../utils/utils'
import { getHookItem } from './hook'

export function useState(initValue: any): TUseStateHook {
	/**
	 * 获取当前 hook(s) 所在的函数组件对应的 fiber 节点
	 */
	const componentFiber: TFiberNode | undefined = __RTCP___.wipFiberOfNowFunctionCompt
	const rootFiber: TFiberNode = getRootFiber(componentFiber as TFiberNode)
	const oldHookOfCompt: TUseStateHookStruct = getHookItem(__RTCP___.hookIndexOfNowFunctionCompt) as TUseStateHookStruct
	const hook: TUseStateHookStruct = {
		useState: true,
		state: oldHookOfCompt ? oldHookOfCompt.state : initValue,
		queue: [],
	}
	const actions: TUseStateHookAction = oldHookOfCompt ? oldHookOfCompt.queue : []

	actions.forEach((item: Function): void => {
		if (item instanceof Function) {
			hook.state = item(hook.state)
			return
		}
		hook.state = item
	})

	const setState: (action: any) => void = (action: any): void => {
		hook.queue.push(action)
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
		__RTP___.rootFiberList.splice(rootFiber.index as number, 1, newRootFiber)
		/**
		 * 将重建的 <App /> 应用的根 fiber 节点标记引用
		 * 在下一次执行 window.requestIdleCallback 回调时将重新从根 fiber 节点处理需要更新的应用
		 *
		 */
		__RTP___.globalFiberRoot.current = newRootFiber
		__RTP___.nextWorkUnitFiber = newRootFiber
	}

	componentFiber.hooks.push(hook)
	__RTCP___.hookIndexOfNowFunctionCompt++

	return [hook.state, setState]
}
