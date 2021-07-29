import { RT_PROFILE } from '../config/runtime.profile'
import { RECONCILE_TYPE } from '../config/config'
import { updateDOM } from './dom'
import { updateFunctionComponent, updateHostComponent } from './component'
import { isFunctionComponent } from '../utils/utils'

export function workLoop(deadline) {
	// console.log(`执行 rIC, 检测当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
	let shouldYield = false
	while (RT_PROFILE.nextWorkUnitFiber && !shouldYield) {
		/*
			 处理"一层" fiber 节点
		 */
		RT_PROFILE.nextWorkUnitFiber = performUnitWork(RT_PROFILE.nextWorkUnitFiber)
		shouldYield = deadline.timeRemaining() < 1
		// console.log(`当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
	}

	/* 
		RT_PROFILE.nextWorkUnitFiber 不存在时
			即 整个 fiber 树已经构建并遍历完成
			即可以开始提交并更新 DOM
	 */
	if (!RT_PROFILE.nextWorkUnitFiber && RT_PROFILE.workInProgressRootFiber) {
		console.time(`Commit Work`)
		commitWork(RT_PROFILE.workInProgressRootFiber.child)
		RT_PROFILE.currentRoot = RT_PROFILE.workInProgressRootFiber
		RT_PROFILE.workInProgressRootFiber = null
		console.timeEnd(`Commit Work`)
		console.log('commitWork ===> ', RT_PROFILE.currentRoot)
	}
	window.requestIdleCallback(workLoop)
}

export function performUnitWork(fiber) {
	if (isFunctionComponent(fiber)) {
		updateFunctionComponent(fiber)
	} else {
		updateHostComponent(fiber)
	}

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

function commitWork(fiber) {
	if (!fiber) {
		return
	}
	let parentFiber = fiber.parent
	while (!parentFiber.dom) {
		parentFiber = parentFiber.parent
	}
	const currDom = parentFiber.dom
	if (fiber.dom != null) {
		if (fiber.effectTag === RECONCILE_TYPE.PLACEMENT) {
			currDom.appendChild(fiber.dom)
		} else if (fiber.effectTag === RECONCILE_TYPE.DELETION) {
			commitDeletion(fiber, currDom)
		} else if (fiber.effectTag === RECONCILE_TYPE.UPDATE) {
			updateDOM(fiber.dom, fiber.alternate.props, fiber.props)
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

function commitDeletion(fiber, parentDom) {
	if (fiber.dom) {
		parentDom.removeChild(fiber)
	} else {
		commitDeletion(fiber.child, parentDom)
	}
}
