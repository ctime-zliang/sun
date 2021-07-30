import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { RECONCILE_TYPE } from '../config/config'
import { updateDOM } from './dom'
import { updateFunctionComponent, updateHostComponent } from './component'
import { isFunctionComponent } from '../utils/utils'

export function workLoop(deadline) {
	let shouldYield = false
	while (__RUNTIME_PROFILE___.nextWorkUnitFiber && !shouldYield) {
		/*
			 处理"一层" fiber 节点
		 */
		__RUNTIME_PROFILE___.nextWorkUnitFiber = performUnitWork(__RUNTIME_PROFILE___.nextWorkUnitFiber)
		shouldYield = deadline.timeRemaining() < 1
	}

	/* 
		__RUNTIME_PROFILE___.nextWorkUnitFiber 不存在时
			即 整个 fiber 树已经构建并遍历完成
			即可以开始提交并更新 DOM
	 */
	// if (!__RUNTIME_PROFILE___.nextWorkUnitFiber && __RUNTIME_PROFILE___.workInProgressRootFiber) {
	if (!__RUNTIME_PROFILE___.nextWorkUnitFiber) {
		console.time(`Commit Work`)
		commitWork(__RUNTIME_PROFILE___.workInProgressRootFiber.child)
		__RUNTIME_PROFILE___.currentRoot = __RUNTIME_PROFILE___.workInProgressRootFiber
		// __RUNTIME_PROFILE___.workInProgressRootFiber = null
		console.timeEnd(`Commit Work`)
		console.log('commitWork ===> ', __RUNTIME_PROFILE___.currentRoot)
	}
	window.requestIdleCallback(workLoop)
}

export function performUnitWork(fiber) {
	/*
		处理顶层节点对应的 fiber 时, 一般视作非函数节点执行 
	 */
	if (isFunctionComponent(fiber)) {
		updateFunctionComponent(fiber)
	} else {
		updateHostComponent(fiber)
	}

	/*
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
