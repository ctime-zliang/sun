import { TFiberNode } from '../types/fiber.types'
import { TUseEffectHookStruct } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getHookItem, setHookUpdate } from './hook'

export function useEffect(callback: () => any, dependences: Array<any> | undefined = undefined): void {
	const oldHookOfCompt: TUseEffectHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseEffectHookStruct
	const hook: TUseEffectHookStruct = {
		nowFiber: __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode,
		/* ... */
		useEffect: true,
		isupdated: false,
		dependences: undefined,
		callback,
		returnCallback: undefined,
	}
	if (!oldHookOfCompt) {
		hook.isupdated = true
		hook.dependences = dependences instanceof Array ? Array.from(dependences) : undefined
	} else {
		hook.callback = oldHookOfCompt.callback
		hook.returnCallback = oldHookOfCompt.returnCallback
		hook.dependences = oldHookOfCompt.dependences
	}
	setHookUpdate(hook, dependences)

	hook.nowFiber.hooks.push(hook)
	__RTCP__.hookIndexOfNowFunctionCompt++
}
