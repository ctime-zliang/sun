import { TFiberNode } from '../types/fiber.types'
import { TUseStateHookStructData, TUseStateHook, TUseStateHookAction } from '../types/hooks.types'
import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { generateFiberStructData, getRootFiber } from '../utils/utils'
import { getHook } from './hook'

export function useState(initValue: any): TUseStateHook {
	const componentFiber: TFiberNode = __RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt
	const rootFiber: TFiberNode = getRootFiber(componentFiber)
	const oldHookOfCompt: TUseStateHookStructData = getHook()
	const hook: TUseStateHookStructData = { state: oldHookOfCompt ? oldHookOfCompt.state : initValue, queue: [] }
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
		const newRootFiber: TFiberNode = generateFiberStructData(
			{
				stateNode: rootFiber.stateNode,
				type: rootFiber.type,
				props: rootFiber.props,
				alternate: rootFiber,
				dirty: true,
			},
			{
				/*
					保留索引值 
				 */
				index: rootFiber.index,
				root: true,
			}
		)
		__RUNTIME_PROFILE___.rootFiberList.splice(rootFiber.index, 1, newRootFiber)
		__RUNTIME_PROFILE___.fiberRoot.current = newRootFiber
		__RUNTIME_PROFILE___.nextWorkUnitFiber = newRootFiber
	}
	componentFiber.hooks.push(hook)
	__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt++
	return [hook.state, setState]
}
