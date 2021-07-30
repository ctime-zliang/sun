import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber } from '../utils/utils'

export function useState(initValue) {
	const alternate = __RUNTIME_PROFILE___.workInProgressFiber.alternate
	const oldHook = alternate && alternate.hooks && alternate.hooks[__RUNTIME_PROFILE___.hookIndex]
	const actions = oldHook ? oldHook.queue : []
	const hook = {
		state: oldHook ? oldHook.state : initValue,
		queue: [],
	}
	actions.forEach((item, index) => {
		hook.state = item(hook.state)
	})
	const setState = action => {
		hook.queue.push(action)
		__RUNTIME_PROFILE___.workInProgressRootFiber = generateStructFiber({
			dom: __RUNTIME_PROFILE___.currentRoot.dom,
			type: __RUNTIME_PROFILE___.currentRoot.dom.nodeName.toLowerCase(),
			props: __RUNTIME_PROFILE___.currentRoot.props,
			alternate: __RUNTIME_PROFILE___.currentRoot,
		})
        __RUNTIME_PROFILE___.nextWorkUnitFiber = __RUNTIME_PROFILE___.workInProgressRootFiber
		__RUNTIME_PROFILE___.deletions = []
	}
	__RUNTIME_PROFILE___.workInProgressFiber.hooks.push(hook)
	__RUNTIME_PROFILE___.hookIndex++
	return [hook.state, setState]
}