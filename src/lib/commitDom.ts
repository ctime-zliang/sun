import { __RUNTIME_PROFILE___ } from '../core/runtime'
import { updateDOM, appendChild, removeChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from 'src/types/dom.types'
import { cacheHooks, isFunctionComponent } from '../utils/utils'

function handleDom(fiber: TFiberNode, tag: any): void {
	if (!fiber.stateNode) {
		/**
		 * 函数组件做特殊处理
		 */
		if (isFunctionComponent(fiber)) {
			if (fiber.effectTag === ENUM_EFFECT_TAG.DELETION) {
				if (!fiber.chm) {
					cacheHooks(fiber, __RUNTIME_PROFILE___.mountedHooksCache)
					fiber.chm = true
				}
				// handleFunctionFiber(fiber)
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

// function handleFunctionFiber(fiber: TFiberNode): void {
// 	if (!fiber) {
// 		return
// 	}
// 	const root: TFiberNode = fiber
// 	let current: TFiberNode = fiber

// 	while (current) {
// 		if (current.child) {
// 			current = current.child
// 			if (!current.child) {
// 				/**
// 				 * 找出 current 所在的函数组件 fiber 节点
// 				 * 缓存该函数组件下的所有 hooks
// 				 */
// 				let nowFunctionParentFiber = current.parent as TFiberNode
// 				while (nowFunctionParentFiber && !(nowFunctionParentFiber.type instanceof Function)) {
// 					nowFunctionParentFiber = nowFunctionParentFiber.parent as TFiberNode
// 				}
// 				if (!nowFunctionParentFiber.chum) {
// 					cacheHooks(nowFunctionParentFiber, __RUNTIME_PROFILE___.unmountedHooksCache)
// 					nowFunctionParentFiber.chum = true
// 				}
// 			}
// 			continue
// 		}
// 		if (current === root) {
// 			console.warn(`===>>> current === root <<<===`)
// 			return
// 		}
// 		while (!current.sibling) {
// 			/**
// 			 * 如果向上查找过程中遇到了函数组件对应的 fiber 节点, 缓存该函数组件下的所有 hooks
// 			 */
// 			if (isFunctionComponent(current) && !current.chum) {
// 				cacheHooks(current, __RUNTIME_PROFILE___.unmountedHooksCache)
// 				current.chum = true
// 			}
// 			if (current.parent === root) {
// 				/**
// 				 * 满足此条件即退出此函数
// 				 * 调用此函数传入的 fiber 即为一个函数组件对应的 fiber 节点
// 				 * 因此 root 肯定是一个函数组件的 fiber 节点
// 				 */
// 				if (isFunctionComponent(root) && !root.chum) {
// 					cacheHooks(root, __RUNTIME_PROFILE___.unmountedHooksCache)
// 					root.chum = true
// 				}
// 				return
// 			}
// 			current = current.parent as TFiberNode
// 		}
// 		/**
// 		 * 如果被找到的目标 fiber 节点是函数组件对应的 fiber 节点, 缓存该函数组件下的所有 hooks
// 		 */
// 		if (isFunctionComponent(current) && !current.chum) {
// 			cacheHooks(current, __RUNTIME_PROFILE___.unmountedHooksCache)
// 			current.chum = true
// 		}
// 		current = current.sibling
// 	}
// }

export function commit(fiber: TFiberNode, action: string): void {
	if (!fiber) {
		return
	}
	const root: TFiberNode = fiber
	let current: TFiberNode = fiber

	while (current) {
		if (current.dirty) {
			handleDom(current, '1')
			current.dirty = false
		}
		if (current.child) {
			current = current.child
			/**
			 * 如果 current 不存在 child, 则判定 current 为当前子 fiber 链表结构的最后一个 fiber 节点
			 */
			if (!current.child) {
				/**
				 * 找出 current 所在的函数组件 fiber 节点
				 * 缓存该函数组件下的所有 hooks
				 */
				let nowFunctionParentFiber = current.parent as TFiberNode
				while (nowFunctionParentFiber && !(nowFunctionParentFiber.type instanceof Function)) {
					nowFunctionParentFiber = nowFunctionParentFiber.parent as TFiberNode
				}
				if (!nowFunctionParentFiber.chm) {
					cacheHooks(nowFunctionParentFiber, __RUNTIME_PROFILE___.mountedHooksCache)
					nowFunctionParentFiber.chm = true
				}
			}
			if (current.dirty) {
				handleDom(current, '2')
				current.dirty = false
			}
			continue
		}
		if (current === root) {
			console.warn(`===>>> current === root <<<===`)
			return
		}
		/**
		 * 当遍历到子 fiber 链表结构的最后一个子 fiber 节点后, 向上查找出距离最近的具有下一个兄弟 fiber 节点的父 fiber 节点
		 */
		while (!current.sibling) {
			/**
			 * 如果向上查找过程中遇到了函数组件对应的 fiber 节点, 缓存该函数组件下的所有 hooks
			 */
			if (isFunctionComponent(current) && !current.chm) {
				cacheHooks(current, __RUNTIME_PROFILE___.mountedHooksCache)
				current.chm = true
			}
			if (current.parent === root) {
				if (isFunctionComponent(current) && !current.chm) {
					cacheHooks(current, __RUNTIME_PROFILE___.mountedHooksCache)
					current.chm = true
				}
				return
			}
			current = current.parent as TFiberNode
		}
		/**
		 * 如果被找到的目标 fiber 节点是函数组件对应的 fiber 节点, 缓存该函数组件下的所有 hooks
		 */
		if (isFunctionComponent(current) && !current.chm) {
			cacheHooks(current, __RUNTIME_PROFILE___.mountedHooksCache)
			current.chm = true
		}
		current = current.sibling
	}
}
