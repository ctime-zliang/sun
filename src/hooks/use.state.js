import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber } from '../utils/utils'
import { getHook } from '../hooks/hook'

export function useState(initValue) {
	const componentFiber = __RUNTIME_PROFILE___.workInProgressFiberOfNowCompt
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
		const rootFiber = generateStructFiber({
			stateNode: __RUNTIME_PROFILE___.currentRootFiber.stateNode,
			type: __RUNTIME_PROFILE___.currentRootFiber.type,
			props: __RUNTIME_PROFILE___.currentRootFiber.props,
			alternate: __RUNTIME_PROFILE___.currentRootFiber,
		})
		__RUNTIME_PROFILE___.rootFiber = rootFiber
		__RUNTIME_PROFILE___.nextWorkUnitFiber = rootFiber
	}
	componentFiber.hooks.push(hook)
	__RUNTIME_PROFILE___.hookIndex++
	return [hook.state, setState]
}
