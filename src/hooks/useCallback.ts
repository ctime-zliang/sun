import { TFiberNode } from '../types/fiber.types'
import { TUseCallbackHookStruct } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getHookItem, setHookUpdate } from './hook'

function createHookItem(callback: () => any): TUseCallbackHookStruct {
	const hookItem: TUseCallbackHookStruct = {
		useCallback: true,
		isUpdated: false,
		dependences: undefined,
		callback,
		returnCallback: callback,
	}
	return hookItem
}

export function useCallback(callback: () => any, dependences: Array<any> | undefined = undefined): any {
	const oldHookOfCompt: TUseCallbackHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseCallbackHookStruct
	const nowFiber: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode
	if (!oldHookOfCompt) {
		nowFiber.hooks.push(createHookItem(callback))
	}
	const hookItem: TUseCallbackHookStruct = nowFiber.hooks[__RTCP__.hookIndexOfNowFunctionCompt] as TUseCallbackHookStruct
	if (!oldHookOfCompt) {
		hookItem.isUpdated = true
		hookItem.dependences = dependences instanceof Array ? Array.from(dependences) : undefined
	} else {
		hookItem.isUpdated = false
		hookItem.returnCallback = oldHookOfCompt.returnCallback
		hookItem.dependences = oldHookOfCompt.dependences
	}

	setHookUpdate(hookItem, dependences)
	if (hookItem.isUpdated && hookItem.callback instanceof Function) {
		hookItem.returnCallback = hookItem.callback
	}

	__RTCP__.hookIndexOfNowFunctionCompt++

	return hookItem.returnCallback
}
