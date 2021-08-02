import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber } from '../utils/utils'

export function useState(initValue) {
	const alternate = __RUNTIME_PROFILE___.workInProgressFiberOfNowCompt.alternate
	const oldHook = alternate && alternate.hooks && alternate.hooks[__RUNTIME_PROFILE___.hookIndex]
	const hook = {
		state: oldHook ? oldHook.state : initValue,
		queue: [],
	}
	const actions = oldHook ? oldHook.queue : []
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
		const startFiber = generateStructFiber({
			dom: __RUNTIME_PROFILE___.currentRootFiber.dom,
			type: __RUNTIME_PROFILE___.currentRootFiber.type,
			props: __RUNTIME_PROFILE___.currentRootFiber.props,
			alternate: __RUNTIME_PROFILE___.currentRootFiber,
		})
		__RUNTIME_PROFILE___.workInProgressFiberOfAppRoot = startFiber
		__RUNTIME_PROFILE___.nextWorkUnitFiber = startFiber
		__RUNTIME_PROFILE___.deletions = []
	}
	__RUNTIME_PROFILE___.workInProgressFiberOfNowCompt.hooks.push(hook)
	__RUNTIME_PROFILE___.hookIndex++
	return [hook.state, setState]
}
