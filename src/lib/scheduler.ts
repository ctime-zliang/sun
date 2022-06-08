import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { commitWork } from './commit'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'
import { isFunctionComponent } from '../utils/utils'
import { TFiberNode, TRootFiberNode } from '../types/fiber.types'
import { TRequestIdleCallbackParams } from '../types/common.types'
import { TVDom } from 'src/types/vdom.types'

export function initWorkLoop() {
	let deletions: Array<TFiberNode> = []
	let currentRootFiber: TFiberNode

	function workLoop(deadline: TRequestIdleCallbackParams): void {
		let shouldYield: boolean = false
		while (__RUNTIME_PROFILE___.nextWorkUnitFiber && !shouldYield) {
			__RUNTIME_PROFILE___.nextWorkUnitFiber = performUnitWork(__RUNTIME_PROFILE___.nextWorkUnitFiber, deletions) as TFiberNode | undefined
			shouldYield = deadline.timeRemaining() < 1
		}
		if (!__RUNTIME_PROFILE___.nextWorkUnitFiber && __RUNTIME_PROFILE___.globalFiberRoot?.current) {
			/*
				暂存当前活动的应用的顶层 fiber(rootFiber) 
				清除全局 globalFiberRoot 对该活动应用的 rootFiber 的引用
			 */
			currentRootFiber = __RUNTIME_PROFILE___.globalFiberRoot.current
			__RUNTIME_PROFILE___.globalFiberRoot.current = null

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
				__RUNTIME_PROFILE___.globalFiberRoot.current = nextRootFiber
			}
		}
		window.requestIdleCallback(workLoop)
	}

	return workLoop
}

export function performUnitWork(fiber: TFiberNode, deletions: Array<any>): TFiberNode | undefined {
	if (!fiber.type) {
		return
	}
	if (isFunctionComponent(fiber)) {
		__RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt = fiber
		__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt = 0
		const childrenVDomItems: Array<TVDom> = [(fiber.type as Function).call(undefined, fiber.props)]
		fiber.props.children = childrenVDomItems
		reconcileChilren(fiber, deletions)
	} else {
		if (!fiber.stateNode) {
			fiber.stateNode = createDOM(fiber)
		}
		reconcileChilren(fiber, deletions)
	}

	/*
		优先
		按照 fiber 节点列表深度遍 
	 */
	if (fiber.child) {
		return fiber.child
	}

	/*
		 按照 fiber 节点列表依次遍历下一个兄弟 fiber 节点
	 */
	while (fiber) {
		if (fiber.sibling) {
			return fiber.sibling
		}
		fiber = fiber.parent as TFiberNode
	}

	return
}
