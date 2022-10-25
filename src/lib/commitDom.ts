import { __RTP__ } from '../core/runtime'
import { updateDOM, appendChild, removeChild, insertChild } from './dom'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from '../types/dom.types'
import {
	cacheFunctionComponentUseEffectHooksOnMounted,
	cacheFunctionComponentUseEffectHooksOnUnmounted,
	getNearestChildFiberWithHoldDom,
	getNearestParentFiberWithHoldDom,
	isFunctionComponent,
	isInsideFragmentFunction,
} from '../utils/utils'

function handleDeletionDom(fiber: TFiberNode): boolean {
	if (isFunctionComponent(fiber)) {
		cacheFunctionComponentUseEffectHooksOnUnmounted(fiber)
		return false
	}
	const parentFiber: TFiberNode = getNearestParentFiberWithHoldDom(fiber.parent as TFiberNode)
	if (isInsideFragmentFunction(fiber)) {
		fiber.stateNode = parentFiber.stateNode
	}
	if (parentFiber && parentFiber.stateNode) {
		if (fiber.stateNode === parentFiber.stateNode) {
			return false
		}
		removeChild(fiber.stateNode, parentFiber.stateNode)
		return true
	}
	return false
}

export function commitDeletion(fiber: TFiberNode): void {
	if (!fiber) {
		return
	}
	const root: TFiberNode = fiber
	let current: TFiberNode = fiber
	let isGotoSibling: boolean = false

	while (current) {
		isGotoSibling = false
		if (current.dirty) {
			handleDeletionDom(current)
			current.dirty = false
		}
		if (current.child) {
			current = current.child
			current.dirty = true
			if (current.dirty) {
				isGotoSibling = handleDeletionDom(current)
				current.dirty = false
			}
			if (!isGotoSibling) {
				continue
			}
		}
		while (!current.sibling) {
			if (current.parent === root || current === root) {
				return
			}
			current = current.parent as TFiberNode
		}
		current = current.sibling
		current.dirty = true
	}
}

/******************************************************************************************/
/******************************************************************************************/

let openStartRecord: boolean = false
let startFiberOfSetReplace: TFiberNode | undefined = undefined
function handleDom(fiber: TFiberNode): void {
	if (openStartRecord && startFiberOfSetReplace === fiber) {
		openStartRecord = false
	}
	if (openStartRecord === false && fiber.effectTag === ENUM_EFFECT_TAG.REPLACE) {
		openStartRecord = true
		startFiberOfSetReplace = fiber
	}
	if (isFunctionComponent(fiber)) {
		cacheFunctionComponentUseEffectHooksOnMounted(fiber)
		return
	}
	const parentFiber: TFiberNode = getNearestParentFiberWithHoldDom(fiber.parent as TFiberNode)
	const nowStateNode: TExtendHTMLDOMElment = fiber.stateNode as TExtendHTMLDOMElment
	if (isInsideFragmentFunction(fiber)) {
		fiber.stateNode = parentFiber.stateNode
	}
	if (parentFiber && parentFiber.stateNode) {
		if (fiber.stateNode === parentFiber.stateNode) {
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.PLACEMENT) {
			appendChild(fiber.stateNode, parentFiber.stateNode)
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.UPDATE) {
			updateDOM(nowStateNode, fiber.alternate ? fiber.alternate.props : {}, fiber.props)
			return
		}
		if (fiber.effectTag === ENUM_EFFECT_TAG.REPLACE) {
			if (startFiberOfSetReplace) {
				const siblingChildFiber: TFiberNode = getNearestChildFiberWithHoldDom(startFiberOfSetReplace.sibling as TFiberNode)
				insertChild(fiber.stateNode, siblingChildFiber ? siblingChildFiber.stateNode : null, parentFiber.stateNode)
			}
			return
		}
	}
}

export function commit(fiber: TFiberNode): void {
	if (!fiber) {
		return
	}
	const root: TFiberNode = fiber
	let current: TFiberNode = fiber

	while (current) {
		if (current.dirty) {
			handleDom(current)
			current.dirty = false
		}
		if (current.child) {
			current = current.child
			if (current.dirty) {
				handleDom(current)
				current.dirty = false
			}
			continue
		}
		if (current === root) {
			console.warn(`[fiber warning] This fiber node has no children or siblings.`)
			return
		}
		while (!current.sibling) {
			if (current.parent === root) {
				return
			}
			current = current.parent as TFiberNode
		}
		current = current.sibling
	}
}
