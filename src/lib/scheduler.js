import { RT_PROFILE } from '../config/runtime.profile'
import { RECONCILE_TYPE } from '../config/config'
import { createDOM } from '../lib/dom'
import { reconcileChilren } from './reconcile'
import { generateStructFiber, syncBlock } from '../utils/utils'

export function initWorkLoop(workInProgress) {
	let nextWorkUnit = workInProgress
	function workLoop(deadline) {
		console.log(`执行 rIC, 检测当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
		let shouldYield = false
		while (nextWorkUnit && !shouldYield) {
			/*
				 处理"一层" fiber 节点
			 */
			nextWorkUnit = performUnitWork(nextWorkUnit)
			// syncBlock(300)
			shouldYield = deadline.timeRemaining() < 1
			console.log(`当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
		}

		/* 
            nextWorkUnit 不存在时
                即 整个 fiber 树已经构建并遍历完成
                即可以开始提交并更新 DOM
         */
		if (!nextWorkUnit && workInProgress) {
			console.log('commitWork ===> ', workInProgress)
			console.time(`Commit Work`)
			commitWork(workInProgress.child)
			// workInProgress = null
			RT_PROFILE.currentRoot = workInProgress
			console.timeEnd(`Commit Work`)
		} else {
			window.requestIdleCallback(workLoop)
		}
	}

	return workLoop
}

export function performUnitWork(fiber) {
	if (!fiber.dom) {
		fiber.dom = createDOM(fiber)
	}

	reconcileChilren(fiber, fiber.props.children)

	/*
		只有父 fiber 节点才有可能存在 child fiber 节点
		当存在 child fiber 节点时, 即在下一次遍历时从该 child fiber 节点开始
	 */
	if (fiber.child) {
		return fiber.child
	}

	while (fiber) {
		/* 
			当存在 sibling fiber 节点时, 即在下一个遍历时从该 sibling fiber 节点开始
		 */
		if (fiber.sibling) {
			return fiber.sibling
		}
		/*
			遍历到树的最后一个叶子节点后, 即向上遍历, 直到更节点的父节点(null) 
		 */
		fiber = fiber.parent
	}
	return null
}

export function commitWork(fiber) {
	if (!fiber) {
		return
	}
	if (fiber.parent && fiber.dom != null) {
		if (fiber.effectTag === RECONCILE_TYPE.PLACEMENT) {
			fiber.parent.dom.appendChild(fiber.dom)
		} else if (fiber.effectTag === RECONCILE_TYPE.DELETION) {
			fiber.parent.dom.removeChild(fiber.dom)
		} else if (fiber.effectTag === RECONCILE_TYPE.UPDATE) {
			updateDom(fiber.dom, fiber.alternate.props, fiber.props)
		}
	}
	/*
		深度递归 
			提交渲染子节点
	 */
	commitWork(fiber.child)
	/*
		广度递归 
			提交渲染兄弟节点
	 */
	commitWork(fiber.sibling)
}
