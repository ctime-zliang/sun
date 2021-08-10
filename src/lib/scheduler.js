import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../runtime/runtime.profile'
import { commitWork } from './commit'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'
import { isFunctionComponent } from '../utils/utils'

export function initWorkLoop() {
	let deletions = []
	let currentRootFiber = null
	function workLoop(deadline) {
		let shouldYield = false
		while (__RUNTIME_PROFILE___.nextWorkUnitFiber && !shouldYield) {
			/*
				 处理"一层" fiber 节点
			 */
			__RUNTIME_PROFILE___.nextWorkUnitFiber = performUnitWork(__RUNTIME_PROFILE___.nextWorkUnitFiber, deletions)
			shouldYield = deadline.timeRemaining() < 1
		}

		/* 
			__RUNTIME_PROFILE___.nextWorkUnitFiber 不存在时
				即 整个 fiber 树已经构建并遍历完成
				即可以开始提交并更新 DOM
		 */
		if (!__RUNTIME_PROFILE___.nextWorkUnitFiber && __RUNTIME_PROFILE___.fiberRoot.current) {
			console.time(`Commit Work ===>>>`)
			deletions.forEach(item => {
				commitWork(item)
			})
			commitWork(__RUNTIME_PROFILE___.fiberRoot.current.child)
			__RUNTIME_PROFILE___.fiberRoot.current.dirty = false
			currentRootFiber = __RUNTIME_PROFILE___.fiberRoot.current
			__RUNTIME_PROFILE___.fiberRoot.current = null
			deletions.length = 0
			console.timeEnd(`Commit Work ===>>>`)
			console.log('Commit Work ~~~>>> ', currentRootFiber)

			/* 
				__RUNTIME_PROFILE___.rootFiberList 中存储每次 render 时新建的 rootFiber
				此处即在处理完本次 render 时, 尝试处理下一个 render 实例
			 */
			const nextRootFiber = __RUNTIME_PROFILE___.rootFiberList[currentRootFiber.index + 1] || null
			if (nextRootFiber && nextRootFiber.dirty) {
				__RUNTIME_PROFILE___.nextWorkUnitFiber = nextRootFiber
				__RUNTIME_PROFILE___.fiberRoot.current = nextRootFiber
			}
		}
		window.requestIdleCallback(workLoop)
	}

	return workLoop
}

export function performUnitWork(fiber, deletions) {
	/*
		在首次 render 时, fiber 为当前应用所在的容器节点对应的 fiber, 视作非函数节点并处理
	 */
	if (isFunctionComponent(fiber)) {
		fiber.hooks = []
		/*
			将当前处理的 fiber 节点暂存
			在 type() 时需要读取当前 fiber 以及对应的 hooks
		*/
		__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt = fiber
		__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt = 0
		const children = [fiber.type.call(undefined, fiber.props)]
		fiber.props.children = children
		// fiber.dirty = false
		reconcileChilren(fiber, deletions)
	} else {
		if (!fiber.stateNode) {
			fiber.stateNode = createDOM(fiber)
		}
		reconcileChilren(fiber, deletions)
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
