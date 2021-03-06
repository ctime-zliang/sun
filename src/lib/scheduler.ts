import { __RTP__, __RTCP__ } from '../core/runtime'
import { commit } from './commitDom'
import { reconcileChilren } from './reconcile'
import { createDOM } from './dom'
import { generateFiberStructData, isFunctionComponent } from '../utils/utils'
import { TFiberNode, TTASKQUEUE_ITEM } from '../types/fiber.types'
import { TRequestIdleCallbackParams } from '../types/hostApi.types'
import { TVDom } from '../types/vdom.types'
import { globalConfig } from '../config/config'
import { ECOMMIT_DOM_ACTION } from '../config/commitDom.enum'
import { TAllHooksStruct, TUseCallbackHookStruct, TUseEffectHookStruct, TUseMemoHookStruct, TUseStateHookStruct } from '../types/hooks.types'

export function initStartRootFiber(rootFiber: TFiberNode): void {
	/**
	 * 重新创建 <App /> 应用对应的 fiber 树的根 fiber 节点
	 */
	const newRootFiber: TFiberNode = generateFiberStructData({
		stateNode: rootFiber.stateNode,
		type: rootFiber.type,
		props: rootFiber.props,
		alternate: rootFiber,
		dirty: true,
		/**
		 * 保留索引值
		 */
		index: rootFiber.index,
		root: true,
		queueUp: rootFiber.queueUp,
	})
	const rootFiberIndex: number = newRootFiber.index as number

	__RTP__.rootFiberList.splice(rootFiberIndex, 1, newRootFiber)
	__RTP__.globalFiberRoot.current = newRootFiber
	__RTP__.nextWorkUnitFiber = newRootFiber
	if (!__RTP__.profileList[rootFiberIndex].async) {
		initSyncWorkLoop()()
	}
}

export function initSyncWorkLoop(): () => void {
	let deletions: Array<TFiberNode> = []

	function workLoop(): void {
		while (__RTP__.nextWorkUnitFiber) {
			__RTP__.nextWorkUnitFiber = performUnitWork(__RTP__.nextWorkUnitFiber, deletions) as TFiberNode
		}
		if (!__RTP__.nextWorkUnitFiber && __RTP__.globalFiberRoot.current) {
			workEnd(deletions)
			return
		}
		workLoop()
	}

	return workLoop
}

export function initAsyncWorkLoop(): (deadline: TRequestIdleCallbackParams) => void {
	let deletions: Array<TFiberNode> = []

	function worLoop(deadline: TRequestIdleCallbackParams): void {
		let shouldYield: boolean = false
		while (__RTP__.nextWorkUnitFiber && !shouldYield) {
			__RTP__.nextWorkUnitFiber = performUnitWork(__RTP__.nextWorkUnitFiber, deletions) as TFiberNode
			shouldYield = deadline.timeRemaining() < 1
		}
		if (!__RTP__.nextWorkUnitFiber && __RTP__.globalFiberRoot.current) {
			workEnd(deletions)
		}
		window.requestIdleCallback(worLoop, { timeout: globalConfig.requestIdleCallbackTimeout })
	}

	return worLoop
}

function workEnd(deletions: Array<TFiberNode>): void {
	/**
	 * 暂存当前活动的应用的顶层 fiber(rootFiber)
	 * 清除全局 globalFiberRoot 对该活动的应用的 rootFiber 的引用
	 */
	const currentRootFiber = __RTP__.globalFiberRoot.current as TFiberNode
	/**
	 * 全局状态变量复位
	 */
	__RTP__.globalFiberRoot.current = undefined
	__RTP__.updateRangeStartFiber = null
	__RTCP__.hookIndexOfNowFunctionCompt = -1
	__RTCP__.wipFiberOfNowFunctionCompt = null

	/**
	 * 提交 DOM 操作
	 */
	// console.time('commit')
	deletions.forEach((item: TFiberNode): void => {
		commit(item, ECOMMIT_DOM_ACTION.DELETION)
	})
	commit(currentRootFiber.child as TFiberNode, ECOMMIT_DOM_ACTION.NORMAL)
	// console.timeEnd('commit')
	// console.log('%c===>>> App Task Finished', 'color: #ff0000;')

	/**
	 * fiber 树状态复位
	 */
	currentRootFiber.dirty = false
	currentRootFiber.queueUp = false
	deletions.length = 0

	const useEffectHooks: Array<TUseEffectHookStruct> = [...__RTP__.unmountedHooksCache, ...__RTP__.mountedHooksCache] as Array<TUseEffectHookStruct>
	for (let i: number = 0; i < useEffectHooks.length; i++) {
		if (useEffectHooks[i].returnCallback instanceof Function) {
			;(useEffectHooks[i].returnCallback as Function).call(undefined)
		}
	}
	__RTP__.unmountedHooksCache.length = 0
	/**
	 * 在组件树全部挂载并视图渲染完毕后的下一个事件循环中执行 useEffect 的回调函数
	 */
	window.setTimeout((): void => {
		for (let i: number = 0; i < __RTP__.mountedHooksCache.length; i++) {
			const hookItem: TUseEffectHookStruct = __RTP__.mountedHooksCache[i] as TUseEffectHookStruct
			if (hookItem.isUpdated && hookItem.callback instanceof Function) {
				hookItem.returnCallback = hookItem.callback.call(undefined)
			}
		}
		__RTP__.mountedHooksCache.length = 0
	})

	/**
	 * 检查并尝试执行下一个实例
	 * 该段处理只会在首次 render 时执行
	 *
	 * 需要在检查 setState 任务队列之前执行, 即需要保证尽快渲染出下一个 <App /> 应用
	 */
	const nextRootFiber: TFiberNode = __RTP__.rootFiberList[(currentRootFiber.index as number) + 1] || undefined
	if (nextRootFiber && nextRootFiber.dirty) {
		__RTP__.nextWorkUnitFiber = nextRootFiber
		__RTP__.globalFiberRoot.current = nextRootFiber
		return
	}

	/**
	 * 需要在每一轮更新结束后检查 setState 任务队列
	 * 队列不为空时, 在空闲状态下开启新一轮更新过程
	 */
	__RTP__.taskGroupIndex = (__RTP__.taskGroupIndex++, __RTP__.taskGroupIndex) > __RTP__.taskGroupQueue.length - 1 ? 0 : __RTP__.taskGroupIndex
	const taskGroup: Array<TTASKQUEUE_ITEM> = __RTP__.taskGroupQueue[__RTP__.taskGroupIndex]
	if (taskGroup.length && !__RTP__.nextWorkUnitFiber) {
		taskGroup.length = 0
		const rootFiber: TFiberNode = __RTP__.rootFiberList[__RTP__.taskGroupIndex]
		initStartRootFiber(((rootFiber.queueUp = true), rootFiber))
	}
}

function updateHookFiberReference(fiber: TFiberNode) {
	const hooks: Array<TAllHooksStruct> = fiber.hooks as Array<TAllHooksStruct>
	for (let i: number = 0; i < hooks.length; i++) {
		if ((hooks[i] as TUseStateHookStruct).useState) {
			const hookItem: TUseStateHookStruct = hooks[i] as TUseStateHookStruct
			hookItem.rootFiber = __RTP__.globalFiberRoot.current as TFiberNode
			hookItem.nowFiber = fiber
		}
		if ((hooks[i] as TUseEffectHookStruct).useEffect) {
			const hookItem: TUseEffectHookStruct = hooks[i] as TUseEffectHookStruct
			hookItem.isUpdated = false
		}
		if ((hooks[i] as TUseMemoHookStruct).useMemo) {
			const hookItem: TUseMemoHookStruct = hooks[i] as TUseMemoHookStruct
			hookItem.isUpdated = false
		}
		if ((hooks[i] as TUseCallbackHookStruct).useCallback) {
			const hookItem: TUseCallbackHookStruct = hooks[i] as TUseCallbackHookStruct
			hookItem.isUpdated = false
		}
	}
}

export function performUnitWork(fiber: TFiberNode, deletions: Array<TFiberNode>): TFiberNode | undefined {
	if (!fiber.type) {
		return
	}

	/**
	 * 调度遍历 fiber 树的过程中, 记录触发状态更新的根 fiber 节点, 则其下的 fiber 节点都属于更新范围
	 * 需要标记该 fiber 节点
	 */
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
			/**
			 * 对于由某个组件被执行 setState 而触发的 fiber 树更新行为
			 * 当当前 fiber 节点为函数组件对应的 fiber 节点, 且不处于需要"更新"范围内时, 将进入此逻辑
			 *
			 * fiber.alternate 将在第一次 update 行为后始终存在
			 */
			if (fiber.alternate) {
				/**
				 * 函数组件
				 * 		对于更新范围之外的函数组件, 需要跳过函数执行
				 * 		在跳过函数的执行后
				 * 		由于函数组件本身未被执行, 故将上一轮更新后的 fiber 节点复用至当前 work fiber 节点
				 * 			需要更新 vDom
				 * 			需要更新 hooks 中关于 fiber 的引用存储
				 * 			需要清除上上一轮的 fiber 节点引用
				 */
				const alternate: TFiberNode = fiber.alternate as TFiberNode
				fiber.hooks = alternate.hooks
				fiber.props.children = alternate.props.children
				fiber.alternate.alternate = null
				updateHookFiberReference(fiber)
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
		/**
		 * 当重新回到标记根 fiber 节点时, 代表更新范围内的 fiber 树已遍历处理完毕
		 */
		if (__RTP__.updateRangeStartFiber === fiber) {
			__RTP__.updateRangeStartFiber = null
		}
		fiber = fiber.parent as TFiberNode
	}
}
