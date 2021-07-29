import { RT_PROFILE } from '../config/runtime.profile'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'

export function updateHostComponent(fiber) {
	if (!fiber.dom) {
		fiber.dom = createDOM(fiber)
	}
	reconcileChilren(fiber, fiber.props.children)
}

export function updateFunctionComponent(fiber) {
	RT_PROFILE.workInProgressFiber = fiber
	RT_PROFILE.workInProgressFiber.hooks = []
	RT_PROFILE.hookIndex = 0
	const children = [fiber.type(fiber.props)]
	reconcileChilren(fiber, children)
}
