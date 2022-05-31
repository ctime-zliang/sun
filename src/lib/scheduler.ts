import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { commitWork } from './commit'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'
import { isFunctionComponent } from '../utils/utils'
import { TFiberNode, TRootFiberNode } from '../types/fiber.types'
import { TRequestIdleCallbackParams } from '../types/common.types'

export function initWorkLoop() {
	let deletions: Array<any> = []
	let currentRootFiber: TFiberNode | null = null
	function workLoop(deadline: TRequestIdleCallbackParams): void {
		let shouldYield: boolean = false
		while (__RUNTIME_PROFILE___.nextWorkUnitFiber && !shouldYield) {
			__RUNTIME_PROFILE___.nextWorkUnitFiber = performUnitWork(__RUNTIME_PROFILE___.nextWorkUnitFiber, deletions)
			shouldYield = deadline.timeRemaining() < 1
		}
		if (!__RUNTIME_PROFILE___.nextWorkUnitFiber && __RUNTIME_PROFILE___.fiberRoot?.current) {
			/*
				暂存当前活动的应用的顶层 fiber(rootFiber) 
				清除全局 fiberRoot 对该活动应用的 rootFiber 的引用
			 */
			currentRootFiber = __RUNTIME_PROFILE___.fiberRoot.current
			__RUNTIME_PROFILE___.fiberRoot.current = null

			/*
				提交 DOM 操作 
			 */
			deletions.forEach(item => {
				commitWork(item)
			})
			commitWork(currentRootFiber.child)
			currentRootFiber.dirty = false
			deletions.length = 0
			console.log(`Commit.Fiber ===>>>`, currentRootFiber)

			/* 
				检查并尝试执行下一个实例
			 */
			const nextRootFiber = __RUNTIME_PROFILE___.rootFiberList[(currentRootFiber as TRootFiberNode).index + 1] || null
			if (nextRootFiber && nextRootFiber.dirty) {
				__RUNTIME_PROFILE___.nextWorkUnitFiber = nextRootFiber
				__RUNTIME_PROFILE___.fiberRoot.current = nextRootFiber
			}
		}
		window.requestIdleCallback(workLoop)
	}

	return workLoop
}

export function performUnitWork(fiber: TFiberNode, deletions: Array<any>): TFiberNode | undefined {
	if (!fiber.type) {
		return undefined
	}
	/*
		在首次 render 时, fiber 为当前应用所在的容器节点对应的 fiber, 视作非函数节点并处理
	 */
	if (isFunctionComponent(fiber)) {
		__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt = fiber
		__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt = 0
		const children: Array<TFiberNode> = [(fiber.type as Function).call(undefined, fiber.props)]
		fiber.props.children = children
		reconcileChilren(fiber, deletions)
	} else {
		if (!fiber.stateNode) {
			fiber.stateNode = createDOM(fiber)
		}
		reconcileChilren(fiber, deletions)
	}
	if (fiber.child) {
		return fiber.child
	}

	while (fiber) {
		if (fiber.sibling) {
			return fiber.sibling
		}
		fiber = fiber.parent as TFiberNode
	}
	return undefined
}
