import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { commitHandleDomWork } from './commitDom'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'
import { isFunctionComponent } from '../utils/utils'
import { TFiberNode } from '../types/fiber.types'
import { TRequestIdleCallbackParams } from '../types/hostApi.types'
import { TVDom } from '../types/vdom.types'
import { globalConfig } from '../config/config'
import { ENUM_COMMIT_DOM_ACTION } from '../config/commitDom.enum'

export function initWorkLoop(): (deadline: TRequestIdleCallbackParams) => void {
	let deletions: Array<TFiberNode> = []
	let currentRootFiber: TFiberNode

	function workLoop(deadline: TRequestIdleCallbackParams): void {
		let shouldYield: boolean = false
		while (__RUNTIME_PROFILE___.nextWorkUnitFiber && !shouldYield) {
			__RUNTIME_PROFILE___.nextWorkUnitFiber = performUnitWork(__RUNTIME_PROFILE___.nextWorkUnitFiber, deletions) as TFiberNode
			shouldYield = deadline.timeRemaining() < 1
		}
		if (!__RUNTIME_PROFILE___.nextWorkUnitFiber && __RUNTIME_PROFILE___.globalFiberRoot.current) {
			/*
				暂存当前活动的应用的顶层 fiber(rootFiber) 
				清除全局 globalFiberRoot 对该活动应用的 rootFiber 的引用
			 */
			currentRootFiber = __RUNTIME_PROFILE___.globalFiberRoot.current as TFiberNode
			__RUNTIME_PROFILE___.globalFiberRoot.current = undefined

			/*
				提交 DOM 操作 
			 */
			console.time('commitHandleDomWork')
			deletions.forEach(item => {
				commitHandleDomWork(item as TFiberNode, ENUM_COMMIT_DOM_ACTION.DELETION)
			})
			commitHandleDomWork(currentRootFiber.child as TFiberNode, ENUM_COMMIT_DOM_ACTION.NORMAL)
			console.timeEnd('commitHandleDomWork')
			currentRootFiber.dirty = false
			deletions.length = 0
			// const fiberList: Array<TFiberNode> = dfs2(currentRootFiber)
			console.log(`Commit.Fiber ===>>>`, currentRootFiber)
			console.log(__RUNTIME_PROFILE___)
			__RUNTIME_PROFILE___.unmountedHooksCache.forEach((item: any): void => {
				if (item.useEffect && item.returnCallback instanceof Function) {
					item.returnCallback.call(undefined)
				}
			})
			__RUNTIME_PROFILE___.unmountedHooksCache.length = 0
			window.setTimeout(() => {
				__RUNTIME_PROFILE___.mountedHooksCache.forEach((item: any): void => {
					if (item.useEffect && item.isupdated && item.callback instanceof Function) {
						item.returnCallback = item.callback.call(undefined)
					}
				})
				__RUNTIME_PROFILE___.mountedHooksCache.length = 0
			})

			/* 
				检查并尝试执行下一个实例
			 */
			const nextRootFiber: TFiberNode = __RUNTIME_PROFILE___.rootFiberList[(currentRootFiber.index as number) + 1] || undefined
			if (nextRootFiber && nextRootFiber.dirty) {
				__RUNTIME_PROFILE___.nextWorkUnitFiber = nextRootFiber
				__RUNTIME_PROFILE___.globalFiberRoot.current = nextRootFiber
			}
		}
		window.requestIdleCallback(workLoop, { timeout: globalConfig.requestIdleCallbackTimeout })
	}

	return workLoop
}

export function performUnitWork(fiber: TFiberNode, deletions: Array<TFiberNode>): TFiberNode | undefined {
	if (!fiber.type) {
		return
	}

	if (isFunctionComponent(fiber)) {
		/* 
			对于函数组件, 当前的 fiber 节点即为函数本身
		 */
		__RUNTIME_COMPT_PROFILE___.wipFiberOfNowFunctionCompt = fiber
		__RUNTIME_COMPT_PROFILE___.hookIndexOfNowFunctionCompt = 0
		/*
			函数组件
				此时 fiber.type 的值即为函数
				在编译后的代码中, 函数内的 JSX 将被编译成 createElement/createTextElement 的嵌套调用
				因此执行函数将返回一系列 vDom 嵌套对象
		 */
		const childrenVDomItems: Array<TVDom> = [(fiber.type as Function).call(undefined, fiber.props)]
		fiber.props.children = childrenVDomItems
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

	return
}
