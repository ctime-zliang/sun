import { __RTP___ } from '../core/runtime'
import { updateDOM, appendChild, removeChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from 'src/types/dom.types'
import { isFunctionComponent } from '../utils/utils'
import { ENUM_COMMIT_DOM_ACTION } from '../config/commitDom.enum'

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

function cacheFunctionComponentHooks(fiber: TFiberNode, action: string): void {
	if (!isFunctionComponent(fiber)) {
		return
	}
	/**
	 * 对于需要删除的 fiber 节点
	 * 缓存其 useEffect hooks
	 */
	if (action === ENUM_COMMIT_DOM_ACTION.DELETION && !fiber.dchm) {
		fiber.hooks.forEach((item: any): void => {
			if (item.useEffect) {
				__RTP___.unmountedHooksCache.push(item)
			}
		})
		fiber.dchm = true
		return
	}
	/**
	 * 其他 fiber 节点
	 * 缓存其 useEffect hooks
	 */
	if (!fiber.chm) {
		fiber.hooks.forEach((item: any): void => {
			if (item.useEffect && item.isupdated) {
				__RTP___.mountedHooksCache.push(item)
			}
		})
		fiber.chm = true
	}
}

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
				cacheFunctionComponentHooks(nowFunctionParentFiber, action)
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
			cacheFunctionComponentHooks(current, action)
			if (current.parent === root) {
				cacheFunctionComponentHooks(current, action)
				return
			}
			current = current.parent as TFiberNode
		}
		/**
		 * 如果被找到的目标 fiber 节点是函数组件对应的 fiber 节点, 缓存该函数组件下的所有 hooks
		 */
		cacheFunctionComponentHooks(current, action)
		current = current.sibling
	}
}