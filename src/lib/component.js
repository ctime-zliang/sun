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
	__RUNTIME_PROFILE___.workInProgressFiber = fiber
	__RUNTIME_PROFILE___.workInProgressFiber.hooks = []
	__RUNTIME_PROFILE___.hookIndex = 0
	const children = [fiber.type(fiber.props)]
	reconcileChilren(fiber, children)
}
