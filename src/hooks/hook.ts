import { TUseStateHookStruct, TUseEffectHookStruct } from '../types/hooks.types'
import { __RTCP___ } from '../core/runtime'
import { TFiberNode } from '../types/fiber.types'

export function getHookItem(index: number): TUseStateHookStruct | TUseEffectHookStruct | undefined {
	const alternate: TFiberNode | null = __RTCP___.wipFiberOfNowFunctionCompt?.alternate as TFiberNode
	if (!alternate) {
		return
	}
	return alternate.hooks && alternate.hooks[index]
}
