import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'

export function getHook() {
	const alternate = __RUNTIME_PROFILE___.workInProgressFiberOfNowCompt.alternate
	return alternate && alternate.hooks && alternate.hooks[__RUNTIME_PROFILE___.hookIndex]
}
