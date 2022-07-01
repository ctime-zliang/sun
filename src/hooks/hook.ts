import { TUseStateHookStruct, TUseEffectHookStruct, TUseMemoHookStruct } from '../types/hooks.types'
import { __RTCP__ } from '../core/runtime'
import { TFiberNode } from '../types/fiber.types'

export function getHookItem(index: number): TUseStateHookStruct | TUseEffectHookStruct | TUseMemoHookStruct | undefined {
	const alternate: TFiberNode | null = __RTCP__.wipFiberOfNowFunctionCompt.alternate as TFiberNode
	if (!alternate) {
		return
	}
	return alternate.hooks && alternate.hooks[index]
}

export function setHookUpdate(hook: TUseEffectHookStruct | TUseMemoHookStruct, outerDependences: Array<any> | undefined = undefined): void {
	/**
	 * 对比依赖的变更
	 * 浅层比较
	 */
	if (hook.dependences instanceof Array && outerDependences instanceof Array) {
		hook.dependences.forEach((item: any, index: number): void => {
			if (!Object.is(item, outerDependences[index])) {
				hook.isupdated = true
			}
		})
	} else {
		hook.isupdated = true
	}
}
