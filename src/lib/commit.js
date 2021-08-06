import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { RECONCILE_TYPE } from '../config/config'
import { updateDOM, commitAppendChild, commitDeleteChild } from './dom'

function commitDom(fiber) {
	if (!fiber.stateNode) {
		return
	}
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

export function commitWork(fiber) {
	if (!fiber) {
		return
	}
	let root = fiber
	let current = fiber
	while (current) {
		if (current.dirty) {
			commitDom(current)
			current.dirty = false
		}
		/* 
            深度遍历子节点
            如果该节点没有子节点, 则跳过
         */
		if (current.child) {
			current = current.child
			if (current.dirty) {
				commitDom(current)
				current.dirty = false
			}
			continue
		}
		if (current === root) {
			return
		}
		/* 
            对于外循环来讲, 会先检查当前节点是否存在兄弟节点
            如果存在兄弟节点, 则跳过
         */
		while (!current.sibling) {
			if (!current.parent || current.parent === root) {
				return
			}
			if (current.dirty) {
				commitDom(current)
				current.dirty = false
			}
			current = current.parent
		}
		/* 
            将指针跳转到下一个兄弟节点
            重新执行循环
         */
		current = current.sibling
	}
	// commitDom(fiber)
	// /*
	// 	深度递归
	// 		提交渲染子节点
	//  */
	// if (fiber.child) {
	// 	commitWork(fiber.child)
	// }
	// /*
	// 	广度递归
	// 		提交渲染兄弟节点
	//  */
	// if (fiber.sibling) {
	// 	commitWork(fiber.sibling)
	// }
}
