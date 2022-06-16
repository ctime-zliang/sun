import { __RUNTIME_PROFILE___ } from '../core/runtime'
import { updateDOM, appendChild, removeChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'

function handleDom(fiber: TFiberNode): void {
	if (!fiber.stateNode) {
		return
	}
	/* 
		查找当前 fiber 节点对应的 DOM 节点的父节点
	 */
	let parentFiber: TFiberNode | null = fiber.parent
	while (parentFiber && !parentFiber.stateNode) {
		parentFiber = parentFiber.parent
	}
	if (parentFiber) {
		const parentDom: HTMLElement | Text | null = parentFiber.stateNode
		if (fiber.effectTag === ENUM_EFFECT_TAG.PLACEMENT) {
			appendChild(fiber.stateNode, parentDom)
		} else if (fiber.effectTag === ENUM_EFFECT_TAG.DELETION) {
			removeChild(fiber, parentDom)
		} else if (fiber.effectTag === ENUM_EFFECT_TAG.UPDATE) {
			updateDOM(fiber.stateNode, fiber.alternate ? fiber.alternate.props : {}, fiber.props)
		}
	}
}

export function commitHandleDomWork(fiber: TFiberNode | null): void {
	if (!fiber) {
		return
	}
	let root: TFiberNode | null = fiber
	let current: TFiberNode | null = fiber

	while (current) {
		if (current.dirty) {
			handleDom(current)
			current.dirty = false
		}
		/* 
            深度遍历子节点
            如果该节点没有子节点, 则跳过
         */
		if (current.child && ((current = current.child), current)) {
			if (current.dirty) {
				handleDom(current)
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
				handleDom(current)
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
