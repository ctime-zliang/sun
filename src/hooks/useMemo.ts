import { TFiberNode } from '../types/fiber.types'
import { TUseMemoHookStruct } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getHookItem, setHookUpdate } from './hook'

export function useMemo(callback: () => any, dependences: Array<any> | undefined = undefined): any {
	const oldHookOfCompt: TUseMemoHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseMemoHookStruct
	const hook: TUseMemoHookStruct = {
		nowFiber: __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode,
		/* ... */
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

	hook.nowFiber.hooks.push(hook)
	__RTCP__.hookIndexOfNowFunctionCompt++

	return hook.returnValue
}
