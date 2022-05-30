import { __RUNTIME_PROFILE___ } from '../core/runtimeProfile'
import { updateDOM, commitAppendChild, commitDeleteChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'

function commitDom(fiber): void {
	if (!fiber.stateNode) {
		return
	}
	/* 
		查找当前 fiber 对应的 DOM 或距离最近且存在 DOM 的 fiber 并返回该 fiber 的 DOM
	 */
	let parentFiber = fiber.parent
	while (!parentFiber.stateNode) {
		parentFiber = parentFiber.parent
	}
	const referenceDom: HTMLElement | Text = parentFiber.stateNode
	if (fiber.effectTag === ENUM_EFFECT_TAG.PLACEMENT) {
		commitAppendChild(fiber.stateNode, referenceDom)
	} else if (fiber.effectTag === ENUM_EFFECT_TAG.DELETION) {
		commitDeleteChild(fiber, referenceDom)
	} else if (fiber.effectTag === ENUM_EFFECT_TAG.UPDATE) {
		updateDOM(fiber.stateNode, fiber.alternate ? fiber.alternate.props : {}, fiber.props)
	}
}

export function commitWork(fiber): void {
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
		if (current.child && ((current = current.child), current)) {
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
}
