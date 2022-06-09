import { __RUNTIME_PROFILE___ } from './core/runtime'
import { initWorkLoop } from './lib/scheduler'
import { generateFiberStructData, generateInitialVDOMStructData, generateRootFiberStructData } from './utils/utils'
import { TVDom } from './types/vdom.types'
import { ENUM_NODE_TYPE } from './config/effect.enum'
import { TFiberNode } from './types/fiber.types'

/* 
	创建一个全局顶层 fiber: globalFiberRoot
	
		当需要 render 多个实例时
		globalFiberRoot.current 将依次(按照 render 调用先后顺序)指向各个 <App /> 对应的 fiber 树

		当多个 <App /> 实例存在且某些实例发生更新时
		globalFiberRoot.current 将依次指向这些需要更新的 <App /> 对应的 fiber 树
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
export function createElement(type: string, props: { [key: string]: any }, ...children: Array<any>): TVDom {
	/*
		Array.flat(Infinity) 性能问题
	 */
	//@ts-ignore
	const flatChildren: Array<any> = children.flat(Infinity) // or children.flat(1)
	const elementVDom: TVDom = generateInitialVDOMStructData(type, {
		...props,
		children: flatChildren.map((child: any): void => {
			return typeof child === 'object' ? child : createTextElement(child)
		}),
	})
	return elementVDom
}

/**
 * @description 创建文本 vDom
 * @function createTextElement
 * @param {string} text 文本内容
 * @return {TVDom}
 */
export function createTextElement(text: string): TVDom {
	const textVDom: TVDom = generateInitialVDOMStructData(ENUM_NODE_TYPE.TEXT_NODE, {
		children: [],
		nodeValue: text,
	})
	return textVDom
}

/**
 * @description 渲染 JSX 节点
 * @function render
 * @param {JSXElement} element JSX 节点
 * @param {HTMLElement} container 容器 HTML DOM 节点
 * @return {void}
 */
let renderIndex: number = -1
export function render(element: TVDom, container: HTMLElement): void {
	debugger
	const nodeName: string = container.nodeName.toLowerCase()
	/*
		创建当前渲染应用的根 fiber 节点
			该 fiber 节点将对应 container DOM 节点
			其第一个子节点为 <App /> 返回的 VDom 对象
	 */
	const rootFiber: TFiberNode = generateFiberStructData({
		type: nodeName,
		props: {
			children: [element],
		},
		stateNode: container,
		// elementType: nodeName,
		alternate: null,
		dirty: true,
		/*
			当前 fiber 的索引编号, 保证值与该 fiber 在 rootFiberList 中的位置索引一致 
		 */
		index: ++renderIndex,
		root: true,
	})
	/* 
		存在多个 render 实例时, 需要记录每个 <App /> 对应的 fiber 树(根节点)
	 */
	__RUNTIME_PROFILE___.rootFiberList.push(rootFiber)
	if (__RUNTIME_PROFILE___.globalFiberRoot && !__RUNTIME_PROFILE___.globalFiberRoot.current) {
		/*
			首次 render 时将全局顶层的 globalFiberRoot 指向当前需要渲染的 <App /> 根 fiber 节点
			并将该 <App /> 对应的 fiber 树标记为 work fiber 节点树
		 */
		__RUNTIME_PROFILE___.globalFiberRoot.current = rootFiber
		__RUNTIME_PROFILE___.nextWorkUnitFiber = rootFiber
		console.log(`AppRootFiber ===>>>`, rootFiber)
		console.log(`__RUNTIME_PROFILE___ ===>>>`, __RUNTIME_PROFILE___)
		window.requestIdleCallback(initWorkLoop())
	}
}
