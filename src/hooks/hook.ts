import { TUseStateHookStructData } from '../types/hooks.types'
import { __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { TFiberNode } from 'src/types/fiber.types'

export function getHook(): TUseStateHookStructData | null {
	const alternate: TFiberNode | null = __RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt?.alternate as TFiberNode | null
	if (!alternate) {
		return null
	}
	return alternate.hooks && alternate.hooks[__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt]
}
