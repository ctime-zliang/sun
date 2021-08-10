import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber, getRootFiber } from '../utils/utils'
import { getHook } from '../hooks/hook'

export function useState(initValue) {
	const componentFiber = __RUNTIME_PROFILE___.workInProgressFiberOfNowCompt
	const rootFiber = getRootFiber(componentFiber)
	const oldHookOfCompt = getHook()
	const hook = { state: oldHookOfCompt ? oldHookOfCompt.state : initValue, queue: [] }
	const actions = oldHookOfCompt ? oldHookOfCompt.queue : []
	actions.forEach((item, index) => {
		if (typeof item === 'function') {
			hook.state = item(hook.state)
			return
		}
		hook.state = item
	})
	const setState = action => {
		hook.queue.push(action)
		/*
			创建新的起始 fiber 对象
		 */
		const newRootFiber = generateStructFiber(
			{
				stateNode: rootFiber.stateNode,
				type: rootFiber.type,
				props: rootFiber.props,
				alternate: rootFiber,
			},
			{
				index: rootFiber.index,
				root: true,
			}
		)
		__RUNTIME_PROFILE___.rootFiberList.splice(rootFiber.index, 1, newRootFiber)
		__RUNTIME_PROFILE___.nextWorkUnitFiber = newRootFiber
	}
	componentFiber.hooks.push(hook)
	__RUNTIME_PROFILE___.hookIndex++
	return [hook.state, setState]
}
