import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'

export function updateHostComponent(fiber) {
	if (!fiber.dom) {
		fiber.dom = createDOM(fiber)
	}
	reconcileChilren(fiber)
}

export function updateFunctionComponent(fiber) {
	// fiber.hooks = []
	/*
		将当前处理的 fiber 节点暂存
		在 type() 时需要读取当前 fiber 以及对应的 hooks
	 */
	__RUNTIME_PROFILE___.workInProgressFiberOfNowCompt = fiber
	__RUNTIME_PROFILE___.hookIndex = 0
	const children = [fiber.type(fiber.props)]
	fiber.props.children = children
	reconcileChilren(fiber)
}
