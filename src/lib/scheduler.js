import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { RECONCILE_TYPE } from '../config/config'
import { updateDOM, commitAppendChild, commitDeleteChild } from './dom'
import { updateFunctionComponent, updateHostComponent } from './component'
import { isFunctionComponent } from '../utils/utils'

function commitWork(fiber) {
	if (!fiber) {
		return
	}
	if (fiber.stateNode != null) {
		/* 
			向上查找以找到最近的包含 DOM 的 fiber 节点
		 */
		let parentFiber = fiber.parent
		while (!parentFiber.stateNode) {
			parentFiber = parentFiber.parent
		}
		const referenceDom = parentFiber.stateNode
		if (fiber.effectTag === RECONCILE_TYPE.PLACEMENT) {
			commitAppendChild(fiber.stateNode, referenceDom)
		} else if (fiber.effectTag === RECONCILE_TYPE.DELETION) {
			commitDeleteChild(fiber, referenceDom)
		} else if (fiber.effectTag === RECONCILE_TYPE.UPDATE) {
			updateDOM(fiber.stateNode, fiber.alternate.props, fiber.props)
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
	if (!__RUNTIME_PROFILE___.nextWorkUnitFiber && __RUNTIME_PROFILE___.workInProgressFiberOfAppRoot) {
		console.time(`Commit Work ==>>`)
		__RUNTIME_PROFILE___.deletions.forEach(item => {
			commitWork(item)
		})
		/*
			提交时直接传入容器节点的子节点的 fiber 对象, 即当前应用顶层节点的 fiber 对象 
		 */
		commitWork(__RUNTIME_PROFILE___.workInProgressFiberOfAppRoot.child)
		console.timeEnd(`Commit Work ==>>`)
		/* 
			保留提交、更新完毕后的当前 fiber 对象
			将顶层标志位重置为 null
		 */
		__RUNTIME_PROFILE___.currentRootFiber = __RUNTIME_PROFILE___.workInProgressFiberOfAppRoot
		// __RUNTIME_PROFILE___.currentRootFiber.alternate = null
		__RUNTIME_PROFILE___.workInProgressFiberOfAppRoot = null
		console.log('commitWork ===> ', __RUNTIME_PROFILE___.currentRootFiber)
	}
	window.requestIdleCallback(workLoop)
}

export function performUnitWork(fiber) {
	/*
		在首次 render 时, fiber 为当前应用所在的容器节点对应的 fiber, 视作非函数节点并处理
	 */
	if (isFunctionComponent(fiber)) {
		updateFunctionComponent(fiber)
	} else {
		updateHostComponent(fiber)
	}

	/*
		当存在 child fiber 节点时, 则在下一次遍历时从该 child fiber 节点开始
	 */
	if (fiber.child) {
		return fiber.child
	}

	while (fiber) {
		/* 
			当存在 sibling fiber 节点时, 则在下一个遍历时从该 sibling fiber 节点开始
		 */
		if (fiber.sibling) {
			return fiber.sibling
		}
		/*
			遍历到树的最后一个叶子节点后, 则向上遍历, 直到更节点的父节点(null) 
		 */
		fiber = fiber.parent
	}
	return null
}
