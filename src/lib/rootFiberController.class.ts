import { generateFiberStructData } from '../utils/utils'
import { TFiberNode } from '../types/fiber.types'
import { TVDom } from '../types/vdom.types'
import { __RTP__ } from '../core/runtime'
import { globalConfig, renderProfile } from '../config/config'
import { initAsyncWorkLoop, initSyncWorkLoop } from './scheduler'

let renderIndex: number = -1

export class RootFiberController {
	private _rootFiber: TFiberNode

	constructor() {
		/* ... */
	}

	public set rootFiber(value: TFiberNode) {
		this._rootFiber = value
	}
	public get rootFiber(): TFiberNode {
		return this._rootFiber
	}

	public createRootFiber(container: HTMLElement): void {
		const nodeName: string = container.nodeName.toLowerCase()
		const rootFiber: TFiberNode = generateFiberStructData({
			type: nodeName,
			props: { children: [] },
			stateNode: container,
			dirty: false,
			/**
			 * 当前 fiber 的索引编号, 保证值与该 fiber 在 rootFiberList 中的位置索引一致
			 */
			index: ++renderIndex,
			root: true,
			queueUp: false,
		})
		rootFiber.triggerUpdate = true
		const rootFiberIndex: number = rootFiber.index as number

		__RTP__.rootFiberList.push(rootFiber)
		__RTP__.taskGroupQueue[rootFiberIndex] = { count: 0 }

		this._rootFiber = rootFiber
	}

	public render(element: TVDom): void {
		const rootFiber: TFiberNode = this._rootFiber
		rootFiber.props.children.push(element)
		rootFiber.dirty = true
		if (!__RTP__.profile.async || (__RTP__.globalFiberRoot && !__RTP__.globalFiberRoot.current)) {
			__RTP__.globalFiberRoot.current = rootFiber
			__RTP__.nextWorkUnitFiber = rootFiber
			if (__RTP__.profile.async) {
				window.requestIdleCallback(initAsyncWorkLoop(), { timeout: globalConfig.requestIdleCallbackTimeout })
			} else {
				initSyncWorkLoop()()
			}
		}
	}
}
