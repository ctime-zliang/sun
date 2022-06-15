import { TUseStateHookStruct, TUseEffectHookStruct } from '../types/hooks.types'
import { __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { TFiberNode } from '../types/fiber.types'

export function getHookItem(index: number): TUseStateHookStruct | TUseEffectHookStruct | undefined {
	const alternate: TFiberNode | null = __RUNTIME_COMPT_PROFILE___.wipFiberOfNowFunctionCompt?.alternate as TFiberNode
	if (!alternate) {
		return
	}
	return alternate.hooks && alternate.hooks[index]
}
