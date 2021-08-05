import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { commitWork } from './commit'
import { updateFunctionComponent, updateHostComponent } from './component'
import { isFunctionComponent } from '../utils/utils'

export function initWorkLoop() {
	function workLoop(deadline) {
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
			__RUNTIME_PROFILE___.workInProgressFiberOfAppRoot = null
			console.log('commitWork ===> ', __RUNTIME_PROFILE___.currentRootFiber)
		}
		window.requestIdleCallback(workLoop)
	}
	
	return workLoop
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
