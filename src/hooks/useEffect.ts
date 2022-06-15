import { TFiberNode } from '../types/fiber.types'
import { TUseEffectHookStruct } from '../types/hooks.types'
import { __RUNTIME_PROFILE___, __RUNTIME_COMPT_PROFILE___ } from '../core/runtime'
import { getHookItem } from './hook'

export function useEffect(callback: () => any, dependences: Array<any> | undefined = undefined): void {
	/*
		获取当前 hook(s) 所在的函数组件 <App /> 对应的 fiber 节点
	 */
	const componentFiber: TFiberNode | undefined = __RUNTIME_COMPT_PROFILE___.wipFiberOfNowFunctionCompt
	const oldHookOfCompt: TUseEffectHookStruct = getHookItem(__RUNTIME_COMPT_PROFILE___.hookIndexOfNowFunctionCompt) as TUseEffectHookStruct
	const hook: TUseEffectHookStruct = {
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
		hook.dependences = oldHookOfCompt.dependences
	}
	/*
        对比依赖的变更 
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
	if (hook.isupdated) {
		/*
            此处使用 window.setTimeout 将是一个失败的设计
         */
		window.setTimeout(() => {
			if (hook.callback instanceof Function) {
				hook.returnCallback = hook.callback && hook.callback()
			}
		})
	}

	;(componentFiber as TFiberNode).hooks.push(hook)
	__RUNTIME_COMPT_PROFILE___.hookIndexOfNowFunctionCompt++
}
