import { isProperty, isOld, isNewly, isSystemEvent, hasProperty } from '../utils/utils'
import { ENUM_NODE_TYPE } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TExtendHTMLDOMElment } from '../types/dom.types'

/**
 * @description 追加 DOM
 * @function appendChild
 * @param {TExtendHTMLDOMElment} childDom 被追加的子节点
 * @param {TExtendHTMLDOMElment | null} parentDom 目标父节点
 * @return {undefined}
 */
export function appendChild(childDom: TExtendHTMLDOMElment | null, parentDom: TExtendHTMLDOMElment | null): void {
	if (!parentDom || !childDom) {
		return
	}
	parentDom.appendChild(childDom)
}

/**
 * @description 移除 DOM
 * @function removeChild
 * @param {TExtendHTMLDOMElment} childDom 被追加的子节点
 * @param {TExtendHTMLDOMElment | null} parentDom 目标父节点
 * @return {undefined}
 */
export function removeChild(childDom: TExtendHTMLDOMElment | null, parentDom: TExtendHTMLDOMElment | null): void {
	if (!parentDom || !childDom) {
		return
	}
	parentDom.removeChild(childDom)
}

/**
 * @description 创建标准 DOM 对象
 * @function createDOM
 * @param {TFiberNode} fiber fiber 节点对象
 * @return {TExtendHTMLDOMElment} 元素 HTMLElement DOM 对象
 */
export function createDOM(fiber: TFiberNode): TExtendHTMLDOMElment {
	const dom: TExtendHTMLDOMElment =
		fiber.type === ENUM_NODE_TYPE.TEXT_NODE
			? (document.createTextNode(``) as TExtendHTMLDOMElment)
			: (document.createElement(fiber.type as string) as TExtendHTMLDOMElment)
	updateDOM(dom, {}, fiber.props as { [key: string]: any })
	return dom
}

/**
 * @description 更新 DOM
 * @function updateDOM
 * @param {TExtendHTMLDOMElment} dom HTMLElement 节点对象
 * @param {object} oldProps Props 属性对象
 * @param {object} newProps Props 属性对象
 * @return {undefined}
 */
export function updateDOM(dom: TExtendHTMLDOMElment, oldProps: { [key: string]: any } = {}, newProps: { [key: string]: any } = {}): void {
	const systemEventOfOldProps = Object.keys(oldProps).filter(isSystemEvent)
	const systemEventOfNewProps = Object.keys(newProps).filter(isSystemEvent)
	const commPropsOfOldProps = Object.keys(oldProps).filter(isProperty)
	const commPropsOfNewProps = Object.keys(newProps).filter(isProperty)
	/* ... */
	const isNewlyHandlerNewProps: (key: string) => boolean = isNewly(oldProps, newProps)

	/**
	 * 移除系统事件
	 */
	for (let i: number = 0; i < systemEventOfOldProps.length; i++) {
		const item: string = systemEventOfOldProps[i]
		if (!hasProperty(newProps, item) || isNewlyHandlerNewProps(item)) {
			const eventType: string = item.toLowerCase().substring(2)
			dom.removeEventListener(eventType, oldProps[item])
		}
	}
	/**
	 * 删除旧属性
	 */
	for (let i: number = 0; i < commPropsOfOldProps.length; i++) {
		const item: string = commPropsOfOldProps[i]
		if (isOld(oldProps, newProps)(item)) {
			dom[item] = undefined
			if (dom.removeAttribute) {
				dom.removeAttribute(item)
			}
		}
	}
	/**
	 * 更新或写入新属性
	 */
	for (let i: number = 0; i < commPropsOfNewProps.length; i++) {
		const item: string = commPropsOfNewProps[i]
		if (isNewlyHandlerNewProps(item)) {
			switch (item) {
				case 'style': {
					if (Object.prototype.toString.call(newProps[item]).toLowerCase() === '[object object]') {
						for (let attr in newProps[item]) {
							dom.style[attr] = newProps[item][attr]
						}
						break
					}
					// dom[item] = newProps[item]
					break
				}
				case 'className': {
					dom.className = newProps[item]
					break
				}
				case 'nodeValue': {
					dom.nodeValue = newProps.nodeValue
					break
				}
				default: {
					dom[item] = newProps[item]
					if (dom.setAttribute && typeof newProps[item] != 'undefined') {
						dom.setAttribute(item, newProps[item])
					}
				}
			}
		}
	}
	/**
	 * 绑定系统事件
	 */
	for (let i: number = 0; i < systemEventOfNewProps.length; i++) {
		const item: string = systemEventOfNewProps[i]
		if (isNewlyHandlerNewProps(item)) {
			const eventType: string = item.toLowerCase().substring(2)
			const fn: (e: Event) => void = newProps[item].bind(undefined)
			newProps[item] = function (e: Event): void {
				if (!e) {
					console.warn(`DOM Event Handler Error.`)
					return
				}
				e.stopPropagation()
				fn.call(e.target, e)
			}
			dom.addEventListener(eventType, newProps[item])
		}
	}
}
