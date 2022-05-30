import { TUseStateHookStructData } from '../types/hooks.types'
import { __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { TFiberNode } from 'src/types/fiber.types'

export function getHook(): TUseStateHookStructData {
	const alternate: TFiberNode = __RUNTIME_COMPT_PROFILE___.workInProgressFiberOfNowCompt.alternate
	return alternate && alternate.hooks && alternate.hooks[__RUNTIME_COMPT_PROFILE___.hookIndexOfNowCompt]
}
