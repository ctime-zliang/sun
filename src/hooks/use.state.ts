import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber, getRootFiber } from '../utils/utils'
import { getHook } from '../hooks/hook'

export function useState(initValue: any) {
	const componentFiber = __RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt
	const rootFiber = getRootFiber(componentFiber)
	const oldHookOfCompt = getHook()
	const hook = { state: oldHookOfCompt ? oldHookOfCompt.state : initValue, queue: [] }
	const actions = oldHookOfCompt ? oldHookOfCompt.queue : []
	actions.forEach((item: any, index: number) => {
		if (typeof item === 'function') {
			hook.state = item(hook.state)
			return
		}
		hook.state = item
	})
	const setState = (action: any) => {
		//@ts-ignore
		hook.queue.push(action)
		const newRootFiber = generateStructFiber(
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