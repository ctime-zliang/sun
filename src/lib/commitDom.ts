import { __RTP__ } from '../core/runtime'
import { updateDOM, appendChild, removeChild, insertChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from 'src/types/dom.types'
import { getNearestChildFiberWithHoldDom, getNearestParentFiberWithHoldDom, isFunctionComponent, isInsideFragmentFunction } from '../utils/utils'
import { ECOMMIT_DOM_ACTION, HTMLELEMENT_NODETYPE } from '../config/commitDom.enum'
import { TUseEffectHookStruct } from '../types/hooks.types'

function handleFragmentDom(fiber: TFiberNode, topParentElement: TExtendHTMLDOMElment): void {
	removeChild(fiber.stateNode, topParentElement)
	while (fiber.sibling) {
		fiber = fiber.sibling
		if (isInsideFragmentFunction(fiber) && fiber.child) {
			handleFragmentDom(fiber.child, topParentElement)
			continue
		}
		removeChild(fiber.stateNode, topParentElement)
	}
}

function handleDom(fiber: TFiberNode): void {
	const parentFiber: TFiberNode = getNearestParentFiberWithHoldDom(fiber.parent as TFiberNode)
	const childFiber: TFiberNode = getNearestChildFiberWithHoldDom(fiber.child as TFiberNode)
	if (isFunctionComponent(fiber)) {
		if (fiber.effectTag === ENUM_EFFECT_TAG.DELETION) {
			if (isInsideFragmentFunction(childFiber) && childFiber.child && childFiber.stateNode) {
				handleFragmentDom(childFiber.child, childFiber.stateNode)
				return
			}
			if (childFiber.stateNode === parentFiber.stateNode) {
				return
			}
			removeChild(childFiber.stateNode, parentFiber.stateNode)
			if (childFiber.props.ref) {
				childFiber.props.ref.current = null
			}
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.REPLACE) {
			if (parentFiber) {
				const siblingFiber: TFiberNode = getNearestChildFiberWithHoldDom(fiber.sibling as TFiberNode)
				insertChild(childFiber.stateNode, siblingFiber ? siblingFiber.stateNode : null, parentFiber.stateNode)
				childFiber.effectTag = ENUM_EFFECT_TAG.NO_EFFECT
			}
			return
		}
		return
	}
	const nowStateNode: TExtendHTMLDOMElment = fiber.stateNode as TExtendHTMLDOMElment
	if (isInsideFragmentFunction(fiber) && fiber.child) {
		if (fiber.effectTag === ENUM_EFFECT_TAG.DELETION) {
			handleFragmentDom(fiber.child, nowStateNode)
			return
		}
	}
	if (parentFiber) {
		if (String(nowStateNode.nodeType) === HTMLELEMENT_NODETYPE.DOCUMENT_FRAGMENT_NODE) {
			fiber.stateNode = parentFiber.stateNode
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.PLACEMENT) {
			appendChild(fiber.stateNode, parentFiber.stateNode)
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.DELETION) {
			removeChild(fiber.stateNode, parentFiber.stateNode)
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.UPDATE) {
			updateDOM(nowStateNode, fiber.alternate ? fiber.alternate.props : {}, fiber.props)
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.REPLACE) {
			insertChild(fiber.stateNode, fiber.sibling ? fiber.sibling.stateNode : null, parentFiber.stateNode)
			return
		}
	}
}

function cacheFunctionComponentUseEffectHooks(fiber: TFiberNode, action: string): void {
	if (!isFunctionComponent(fiber)) {
		return
	}
	/**
	 * 对于需要删除的 fiber 节点
	 * 缓存其 useEffect hooks
	 */
	if (action === ECOMMIT_DOM_ACTION.DELETION && fiber.effectTag === ENUM_EFFECT_TAG.DELETION && !fiber.effectCachedUnmounted) {
		for (let i: number = 0; i < fiber.hooks.length; i++) {
			const hookItem: TUseEffectHookStruct = fiber.hooks[i] as TUseEffectHookStruct
			if (hookItem.useEffect) {
				__RTP__.unmountedHooksCache.push(fiber.hooks[i])
			}
		}
		fiber.effectCachedUnmounted = true
		return
	}
	/**
	 * 其他 fiber 节点
	 * 缓存其 useEffect hooks
	 */
	if (!fiber.effectCachedMounted) {
		for (let i: number = 0; i < fiber.hooks.length; i++) {
			const hookItem: TUseEffectHookStruct = fiber.hooks[i] as TUseEffectHookStruct
			if (hookItem.useEffect && hookItem.isUpdated) {
				__RTP__.mountedHooksCache.push(fiber.hooks[i])
			}
		}
		fiber.effectCachedMounted = true
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
			handleDom(current)
			cacheFunctionComponentUseEffectHooks(current, action)
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
				// cacheFunctionComponentUseEffectHooks(nowFunctionParentFiber, action)
			}
			if (current.dirty) {
				handleDom(current)
				current.dirty = false
			}
			continue
		}
		if (current === root) {
			// cacheFunctionComponentUseEffectHooks(current, action)
			console.warn(`[fiber warning] This fiber node has no children or siblings.`)
			return
		}
		/**
		 * 当遍历到子 fiber 链表结构的最后一个子 fiber 节点后, 向上查找出距离最近的具有下一个兄弟 fiber 节点的父 fiber 节点
		 */
		while (!current.sibling) {
			/**
			 * 如果向上查找过程中遇到了函数组件对应的 fiber 节点, 缓存该函数组件下的所有 hooks
			 */
			// cacheFunctionComponentUseEffectHooks(current, action)
			if (current.parent === root) {
				// cacheFunctionComponentUseEffectHooks(current, action)
				return
			}
			current = current.parent as TFiberNode
		}
		/**
		 * 如果被找到的目标 fiber 节点是函数组件对应的 fiber 节点, 缓存该函数组件下的所有 hooks
		 */
		// cacheFunctionComponentUseEffectHooks(current, action)
		current = current.sibling
	}
}
