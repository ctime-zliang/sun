import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { RECONCILE_TYPE } from '../config/config'
import { updateDOM, commitAppendChild, commitDeleteChild } from './dom'

export function commitWork(fiber) {
	if (!fiber) {
		return
	}
	if (fiber.stateNode != null) {
		/* 
			向上查找以找到最近的包含 DOM 的 fiber 节点
		 */
		let parentFiber = fiber.parent
		while (!parentFiber.stateNode) {
			parentFiber = parentFiber.parent
		}
		const referenceDom = parentFiber.stateNode
		if (fiber.effectTag === RECONCILE_TYPE.PLACEMENT) {
			commitAppendChild(fiber.stateNode, referenceDom)
		} else if (fiber.effectTag === RECONCILE_TYPE.DELETION) {
			commitDeleteChild(fiber, referenceDom)
		} else if (fiber.effectTag === RECONCILE_TYPE.UPDATE) {
			updateDOM(fiber.stateNode, fiber.alternate.props, fiber.props)
		}
	}
	/*
		深度递归 
			提交渲染子节点
	 */
	if (fiber.child) {
		commitWork(fiber.child)
	}
	/*
		广度递归 
			提交渲染兄弟节点
	 */
	if (fiber.sibling) {
		commitWork(fiber.sibling)
	}
}
