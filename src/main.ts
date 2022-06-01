import { __RUNTIME_PROFILE___ } from './core/runtime'
import { initWorkLoop } from './lib/scheduler'
import { generateFiberStructData, generateInitialVDOMStructData, generateRootFiberStructData } from './utils/utils'
import { TVDom } from './types/vdom.types'
import { ENUM_NODE_TYPE } from './config/effect.enum'
import { TFiberNode } from './types/fiber.types'

/* 
	创建一个全局的 globalFiberRoot
	并设置其 current 指针指向当前活动(即 处于 mount 或 update 时)的应用的顶层 fiber
 */
__RUNTIME_PROFILE___.globalFiberRoot = generateRootFiberStructData() as TFiberNode

/**
 * @description 创建元素 vDom
 * @function createElement
 * @param {string} type 元素标签名
 * @param {object} props 属性对象
 * @param {any} children 子节点列表
 * @return {TVDom}
 */
export function createElement(type: string, props: { [key: string]: any }, ...children: any[]): TVDom {
	//@ts-ignore
	const flatChildren: Array<any> = children.flat(Infinity) // or children.flat(1)
	return generateInitialVDOMStructData(type, {
		...props,
		children: flatChildren.map((child: any): void => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
	})
}

/**
 * @description 创建文本 vDom
 * @function createTextElement
 * @param {string} text 文本内容
 * @return {TVDom}
 */
export function createTextElement(text: string): TVDom {
	return generateInitialVDOMStructData(ENUM_NODE_TYPE.TEXT_NODE, {
		nodeValue: text,
		children: [],
	})
}

/**
 * @description 渲染 JSX 节点
 * @function render
 * @param {JSXElement} element JSX 节点
 * @param {HTMLElement} container 容器 HTML DOM 节点
 * @return {void}
 */
let renderIndex: number = -1
export function render(element: any, container: HTMLElement): void {debugger
	/*
		创建渲染应用的容器对应的 fiber 节点
	 */
	const rootFiber: TFiberNode = generateFiberStructData(
		{
			stateNode: container,
			type: container.nodeName.toLowerCase(),
			props: { children: [element] },
			alternate: null,
			dirty: true,
			/*
				当前 fiber 的索引编号, 保证值与该 fiber 在 fiber-list 中的位置索引一致 
			 */
			index: ++renderIndex,
			root: true,
		}
	)
	__RUNTIME_PROFILE___.rootFiberList.push(rootFiber)
	/*
		__RUNTIME_PROFILE___.globalFiberRoot 是一定存在的
		原则上是无需判断该属性是否存在, 只需要判断 .current 是否指向合法的 fiber 即可
	 */
	if (__RUNTIME_PROFILE___.globalFiberRoot && !__RUNTIME_PROFILE___.globalFiberRoot.current) {
		__RUNTIME_PROFILE___.globalFiberRoot.current = rootFiber
		__RUNTIME_PROFILE___.nextWorkUnitFiber = rootFiber
		console.log(`Root.Fiber ===>>>`, rootFiber)
		window.requestIdleCallback(initWorkLoop())
	}
}
