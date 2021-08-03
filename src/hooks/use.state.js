import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber } from '../utils/utils'

export function useState(initValue) {
	const alternate = __RUNTIME_PROFILE___.workInProgressFiberOfNowCompt.alternate
	const oldHookOfCompt = alternate && alternate.hooks && alternate.hooks[__RUNTIME_PROFILE___.hookIndex]
	/*
		从上一轮更新完毕后的 fiber 节点中读取 hooks 列表
		如果没有, 则采用新建的空白 hook 暂存
	 */
	let hook = { state: initValue, queue: [] }
	if (oldHookOfCompt) {
		hook = oldHookOfCompt
	}
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
		const startFiber = generateStructFiber({
			stateNode: __RUNTIME_PROFILE___.currentRootFiber.stateNode,
			elementType: __RUNTIME_PROFILE___.currentRootFiber.elementType,
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
