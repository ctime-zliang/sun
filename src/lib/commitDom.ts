import { __RUNTIME_PROFILE___ } from '../core/runtime'
import { updateDOM, appendChild, removeChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from 'src/types/dom.types'
import { isFunctionComponent } from '../utils/utils'

function handleDom(fiber: TFiberNode, tag: any): void {
	if (!fiber.stateNode) {
		/**
		 * 函数组件做特殊处理
		 */
		if (isFunctionComponent(fiber)) {
			if (fiber.effectTag === ENUM_EFFECT_TAG.DELETION) {
				/**
				 * 找出该函数组件对应的 fiber 节点的第一个具有真实 DOM 句柄(fiber.stateNode)的子 fiber 节点
				 */
				let childFiber: TFiberNode = fiber.child as TFiberNode
				while (!childFiber.stateNode) {
					childFiber = childFiber.child as TFiberNode
				}
				/**
				 * 找出该函数组件对应的 fiber 节点距离最近的具有真实 DOM 句柄(fiber.stateNode)的父 fiber 节点
				 */
				let parentFiber: TFiberNode | null = fiber.parent
				while (parentFiber && !parentFiber.stateNode) {
					parentFiber = parentFiber.parent
				}
				removeChild(childFiber.stateNode, (parentFiber as TFiberNode).stateNode)
			}
			return
		}
		return
	}
	/**
	 * 找出该函数组件对应的 fiber 节点距离最近的具有真实 DOM 句柄(fiber.stateNode)的父 fiber 节点
	 */
	let parentFiber: TFiberNode | null = fiber.parent
	while (parentFiber && !parentFiber.stateNode) {
		parentFiber = parentFiber.parent
	}
	if (parentFiber) {
		const parentDom: TExtendHTMLDOMElment | null = parentFiber.stateNode
		switch (fiber.effectTag) {
			case ENUM_EFFECT_TAG.PLACEMENT: {
				appendChild(fiber.stateNode, parentDom)
				break
			}
			case ENUM_EFFECT_TAG.DELETION: {
				removeChild(fiber.stateNode, parentDom)
				break
			}
			case ENUM_EFFECT_TAG.UPDATE: {
				updateDOM(fiber.stateNode, fiber.alternate ? fiber.alternate.props : {}, fiber.props)
				break
			}
			default:
		}
	}
}

export function commitHandleDomWork(fiber: TFiberNode, action: string): void {
	if (!fiber) {
		return
	}
	let root: TFiberNode = fiber
	let current: TFiberNode = fiber
	let functionParentFilter: TFiberNode = fiber

	while (current) {
		if (current.dirty) {
			handleDom(current, '1')
			current.dirty = false
		}
		/**
		 * 如果某一层 fiber 节点被标记为删除, 则无需进行后续操作
		 */
		if (current.effectTag === ENUM_EFFECT_TAG.DELETION) {
			return
		}
		if (current.child) {
			current = current.child
			/**
			 * 如果 current 不存在 child, 则判定 current 为当前子 fiber 链表结构的最后一个 fiber 节点
			 */
			if (!current.child) {
				/**
				 * 找出 current 所在的函数组件 fiber 节点
				 * 缓存下这个函数组件 fiber 节点
				 * 缓存该函数组件下的所有 hooks
				 */
				functionParentFilter = current.parent as TFiberNode
				while (functionParentFilter && !(functionParentFilter.type instanceof Function)) {
					functionParentFilter = functionParentFilter.parent as TFiberNode
				}
				if (functionParentFilter.effectTag !== ENUM_EFFECT_TAG.DELETION) {
					functionParentFilter.hooks.forEach((item: any): void => {
						__RUNTIME_PROFILE___.hooksCache.push(item)
					})
				}
			}
			if (current.dirty) {
				handleDom(current, '2')
				current.dirty = false
			}
			continue
		}
		if (current === root) {
			return
		}
		/**
		 * 当遍历到子 fiber 链表结构的最后一个子 fiber 节点后, 向上查找出距离最近的具有下一个兄弟 fiber 节点的父 fiber 节点
		 */
		while (!current.sibling) {
			/**
			 * 如果向上查找过程中遇到了函数组件对应的 fiber 节点, 必要时缓存该函数组件下的所有 hooks
			 */
			if (isFunctionComponent(current) && functionParentFilter !== current && functionParentFilter.effectTag !== ENUM_EFFECT_TAG.DELETION) {
				current.hooks.forEach((item: any): void => {
					__RUNTIME_PROFILE___.hooksCache.push(item)
				})
			}
			if (!current.parent || current.parent === root) {
				return
			}
			current = current.parent
		}
		/**
		 * 如果被找到的目标 fiber 节点是函数组件对应的 fiber 节点, 必要时缓存该函数组件下的所有 hooks
		 */
		if (isFunctionComponent(current) && functionParentFilter !== current && functionParentFilter.effectTag !== ENUM_EFFECT_TAG.DELETION) {
			current.hooks.forEach((item: any): void => {
				__RUNTIME_PROFILE___.hooksCache.push(item)
			})
		}
		current = current.sibling
	}
}
