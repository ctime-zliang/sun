import { TFiberNode } from '../types/fiber.types'
import { TUseEffectHookStruct } from '../types/hooks.types'
import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { getHookItem } from './hook'

export function useEffect(callback: () => any, dependences: Array<any> | undefined = undefined): void {
	/**
	 * 获取当前 hook(s) 所在的函数组件对应的 fiber 节点
	 */
	const componentFiber: TFiberNode = __RUNTIME_COMPT_PROFILE___.wipFiberOfNowFunctionCompt as TFiberNode
	const oldHookOfCompt: TUseEffectHookStruct = getHookItem(__RUNTIME_COMPT_PROFILE___.hookIndexOfNowFunctionCompt) as TUseEffectHookStruct
	const hook: TUseEffectHookStruct = {
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
		// hook.callback = oldHookOfCompt.callback
		hook.dependences = oldHookOfCompt.dependences
	}
	/**
	 * 对比依赖的变更
	 */
	if (hook.dependences instanceof Array && dependences instanceof Array) {
		hook.dependences.forEach((item: any, index: number): void => {
			if (!Object.is(item, dependences[index])) {
				hook.isupdated = true
			}
		})
	} else {
		hook.isupdated = true
	}

	componentFiber.hooks.push(hook)
	__RUNTIME_COMPT_PROFILE___.hookIndexOfNowFunctionCompt++
}
