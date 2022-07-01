import { TFiberNode } from '../types/fiber.types'
import { TUseMemoHookStruct } from '../types/hooks.types'
import { __RTP__, __RTCP___ } from '../core/runtime'
import { getHookItem, setHookUpdate } from './hook'

export function useMemo(callback: () => any, dependences: Array<any> | undefined = undefined): any {
	/**
	 * 获取当前 hook(s) 所在的函数组件对应的 fiber 节点
	 */
	const componentFiber: TFiberNode = __RTCP___.wipFiberOfNowFunctionCompt as TFiberNode
	const oldHookOfCompt: TUseMemoHookStruct = getHookItem(__RTCP___.hookIndexOfNowFunctionCompt) as TUseMemoHookStruct
	const hook: TUseMemoHookStruct = {
		useMemo: true,
		isupdated: false,
		dependences: undefined,
		callback,
		returnValue: undefined,
	}
	if (!oldHookOfCompt) {
		hook.isupdated = true
		hook.dependences = dependences instanceof Array ? Array.from(dependences) : undefined
	} else {
		hook.returnValue = oldHookOfCompt.returnValue
		hook.dependences = oldHookOfCompt.dependences
	}
	setHookUpdate(hook, dependences)

	if (hook.isupdated && hook.callback) {
		hook.returnValue = hook.callback()
	}

	componentFiber.hooks.push(hook)
	__RTCP___.hookIndexOfNowFunctionCompt++

	return hook.returnValue
}
