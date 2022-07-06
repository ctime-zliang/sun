import { __RTP__, __RTCP__ } from '../core/runtime'
import { commit } from './commitDom'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'
import { isFunctionComponent } from '../utils/utils'
import { TFiberNode } from '../types/fiber.types'
import { TRequestIdleCallbackParams } from '../types/hostApi.types'
import { TVDom } from '../types/vdom.types'
import { globalConfig } from '../config/config'
import { ENUM_COMMIT_DOM_ACTION } from '../config/commitDom.enum'
import { TUseStateHookStruct } from '../types/hooks.types'

export function initSyncWorkLoop(): () => void {
	let deletions: Array<TFiberNode> = []
	let currentRootFiber: TFiberNode

	console.time('syncWorkLoop')

	function workLoop(): void {
		while (__RTP__.nextWorkUnitFiber) {
			__RTP__.nextWorkUnitFiber = performUnitWork(__RTP__.nextWorkUnitFiber, deletions) as TFiberNode
		}
		if (!__RTP__.nextWorkUnitFiber && __RTP__.globalFiberRoot.current) {
			console.timeEnd('syncWorkLoop')
			workEnd(deletions, currentRootFiber)
			return
		}
		workLoop()
	}

	return workLoop
}

export function initAsyncWorkLoop(): (deadline: TRequestIdleCallbackParams) => void {
	let deletions: Array<TFiberNode> = []
	let currentRootFiber: TFiberNode

	function worLoop(deadline: TRequestIdleCallbackParams): void {
		let shouldYield: boolean = false
		while (__RTP__.nextWorkUnitFiber && !shouldYield) {
			__RTP__.nextWorkUnitFiber = performUnitWork(__RTP__.nextWorkUnitFiber, deletions) as TFiberNode
			shouldYield = deadline.timeRemaining() < 1
		}
		if (!__RTP__.nextWorkUnitFiber && __RTP__.globalFiberRoot.current) {
			workEnd(deletions, currentRootFiber)
		}
		window.requestIdleCallback(worLoop, { timeout: globalConfig.requestIdleCallbackTimeout })
	}

	return worLoop
}

function workEnd(deletions: Array<TFiberNode>, currentRootFiber: TFiberNode): void {
	/**
	 * 暂存当前活动的应用的顶层 fiber(rootFiber)
	 * 清除全局 globalFiberRoot 对该活动应用的 rootFiber 的引用
	 */
	currentRootFiber = __RTP__.globalFiberRoot.current as TFiberNode
	/**
	 * 复位
	 */
	__RTP__.globalFiberRoot.current = undefined
	__RTP__.updateRangeStartFiber = null
	__RTCP__.hookIndexOfNowFunctionCompt = -1
	__RTCP__.wipFiberOfNowFunctionCompt = null

	console.time('commit')
	deletions.forEach((item: TFiberNode): void => {
		commit(item, ENUM_COMMIT_DOM_ACTION.DELETION)
	})
	commit(currentRootFiber.child as TFiberNode, ENUM_COMMIT_DOM_ACTION.NORMAL)
	console.timeEnd('commit')

	currentRootFiber.dirty = false
	deletions.length = 0

	const useEffectHooks: Array<any> = [...__RTP__.unmountedHooksCache, ...__RTP__.mountedHooksCache]
	useEffectHooks.forEach((item: any): void => {
		if (item.returnCallback instanceof Function) {
			item.returnCallback.call(undefined)
		}
	})
	__RTP__.unmountedHooksCache.length = 0
	/**
	 * 在组件树全部挂载并视图渲染完毕后的下一个事件循环中执行 useEffect 的回调函数
	 */
	window.setTimeout(() => {
		__RTP__.mountedHooksCache.forEach((item: any): void => {
			if (item.isupdated && item.callback instanceof Function) {
				item.returnCallback = item.callback.call(undefined)
			}
		})
		__RTP__.mountedHooksCache.length = 0
	})

	console.log(__RTP__)

	/**
	 * 检查并尝试执行下一个实例
	 */
	const nextRootFiber: TFiberNode = __RTP__.rootFiberList[(currentRootFiber.index as number) + 1] || undefined
	if (nextRootFiber && nextRootFiber.dirty) {
		__RTP__.nextWorkUnitFiber = nextRootFiber
		__RTP__.globalFiberRoot.current = nextRootFiber
	}
}

export function performUnitWork(fiber: TFiberNode, deletions: Array<TFiberNode>): TFiberNode | undefined {
	// debugger
	if (!fiber.type) {
		return
	}

	if (!__RTP__.updateRangeStartFiber && fiber.triggerUpdate) {
		__RTP__.updateRangeStartFiber = fiber
	}

	if (isFunctionComponent(fiber)) {
		if (!!__RTP__.updateRangeStartFiber) {
			/**
			 * 对于函数组件, 当前的 fiber 节点即为函数本身
			 */
			__RTCP__.wipFiberOfNowFunctionCompt = fiber
			__RTCP__.hookIndexOfNowFunctionCompt = 0
			/**
			 * 函数组件
			 * 		此时 fiber.type 的值即为函数
			 * 		在编译后的代码中, 函数内的 JSX 将被编译成 createElement/createTextElement 的嵌套调用
			 * 		因此执行函数将返回一系列 vDom 嵌套对象
			 */
			const childrenVDomItems: Array<TVDom> = [(fiber.type as Function).call(undefined, fiber.props)]
			fiber.props.children = childrenVDomItems
		} else {
			const alternate: TFiberNode = fiber.alternate as TFiberNode
			if (alternate) {
				fiber.hooks = alternate.hooks
				fiber.props.children = alternate.props.children
				if (fiber.alternate) {
					fiber.alternate.alternate = null
				}
				const hooks: Array<TUseStateHookStruct> = fiber.hooks as Array<TUseStateHookStruct>
				hooks.forEach((item: TUseStateHookStruct): void => {
					if (item.useState) {
						item.rootFiber = __RTP__.globalFiberRoot.current as TFiberNode
						item.nowFiber = fiber
					}
				})
			}
		}
		reconcileChilren(fiber, deletions)
	} else {
		if (!fiber.stateNode) {
			fiber.stateNode = createDOM(fiber)
		}
		reconcileChilren(fiber, deletions)
	}

	fiber.triggerUpdate = false

	if (fiber.child) {
		return fiber.child
	}

	while (fiber) {
		if (fiber.sibling) {
			return fiber.sibling
		}
		if (__RTP__.updateRangeStartFiber === fiber) {
			__RTP__.updateRangeStartFiber = null
		}
		fiber = fiber.parent as TFiberNode
	}
}
