import { TFiberNode } from '../types/fiber.types'
import { TUseMemoHookStruct } from '../types/hooks.types'
import { __RTP__, __RTCP__ } from '../core/runtime'
import { getHookItem, setHookUpdate } from './hook'

function createHookItem(callback: () => any): TUseMemoHookStruct {
	const hookItem: TUseMemoHookStruct = {
		useMemo: true,
		isUpdated: false,
		dependences: undefined,
		callback,
		returnValue: undefined,
	}
	return hookItem
}

export function useMemo(callback: () => any, dependences: Array<any> | undefined = undefined): any {
	const oldHookOfCompt: TUseMemoHookStruct = getHookItem(__RTCP__.hookIndexOfNowFunctionCompt) as TUseMemoHookStruct
	const nowFiber: TFiberNode = __RTCP__.wipFiberOfNowFunctionCompt as TFiberNode
	if (!oldHookOfCompt) {
		nowFiber.hooks.push(createHookItem(callback))
	}
	const hookItem: TUseMemoHookStruct = nowFiber.hooks[__RTCP__.hookIndexOfNowFunctionCompt] as TUseMemoHookStruct
	if (!oldHookOfCompt) {
		hookItem.isUpdated = true
		hookItem.dependences = dependences instanceof Array ? Array.from(dependences) : undefined
	} else {
		hookItem.isUpdated = false
		hookItem.returnValue = oldHookOfCompt.returnValue
		hookItem.dependences = oldHookOfCompt.dependences
	}

	setHookUpdate(hookItem, dependences)
	if (hookItem.isUpdated) {
		hookItem.callback = callback
		hookItem.returnValue = hookItem.callback.call(undefined)
	}

	__RTCP__.hookIndexOfNowFunctionCompt++

	return hookItem.returnValue
}
