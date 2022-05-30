import { isProperty, isOld, isNewly, isSystemEvent } from '../utils/utils'
import { ENUM_NODE_TYPE } from '../config/effect.enum'
import { IHHTMLElement, ITHTMLElement } from '../types/dom.types'

/**
 * 追加 DOM
 * @param {object} childDom 被追加的子节点
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function commitAppendChild(childDom: HTMLElement | Text, parentDom: HTMLElement | Text): void {
	parentDom.appendChild(childDom)
}

/**
 * 移除 DOM
 * @param {object} fiber fiber 节点对象
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function commitDeleteChild(fiber, parentDom: HTMLElement | Text): void {
	if (fiber.stateNode) {
		parentDom.removeChild(fiber.stateNode)
		return
	}
	// commitDeletion(fiber.child, parentDom)
}

/**
 * 创建 标准 DOM 对象
 * @param {object} fiber fiber 节点对象
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function createDOM(fiber): HTMLElement | Text {
	const dom: HTMLElement | Text = fiber.type === ENUM_NODE_TYPE.TEXT_NODE ? document.createTextNode(``) : document.createElement(fiber.type)
	updateDOM(dom, {}, fiber.props)
	return dom
}

/**
 * 更新 DOM
 * @param {object} dom HTMLElement 节点对象
 * @param {object} oldProps Props 属性对象
 * @param {object} newProps Props 属性对象
 * @return {htmlelement} 元素 DOM 对象
 */
export function updateDOM(dom: IHHTMLElement | ITHTMLElement, oldProps: { [key: string]: any } = {}, newProps: { [key: string]: any } = {}): void {
	const systemEventOfOldProps = Object.keys(oldProps).filter(isSystemEvent)
	const systemEventOfNewProps = Object.keys(newProps).filter(isSystemEvent)
	const commPropsOfOldProps = Object.keys(oldProps).filter(isProperty)
	const commPropsOfNewProps = Object.keys(newProps).filter(isProperty)

	/*
		移除系统事件
	 */
	for (let i: number = 0; i < systemEventOfOldProps.length; i++) {
		const item: string = systemEventOfOldProps[i]
		if (!(item in newProps) || isNewly(oldProps, newProps)(item)) {
			const eventType: string = item.toLowerCase().substring(2)
			dom.removeEventListener(eventType, oldProps[item])
		}
	}
	/* 
		删除旧属性
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
	/*
		更新或写入新属性 
	 */
	for (let i: number = 0; i < commPropsOfNewProps.length; i++) {
		const item: string = commPropsOfNewProps[i]
		if (isNewly(oldProps, newProps)(item)) {
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
					dom[item] = newProps[item]
					break
				}
				default: {
					//@ts-ignore
					dom[item] = newProps[item]
					//@ts-ignore
					if (dom.setAttribute && typeof newProps[item] != 'undefined') {
						//@ts-ignore
						dom.setAttribute(item, newProps[item])
					}
				}
			}
		}
	}
	/*
		绑定系统事件
	 */
	for (let i: number = 0; i < systemEventOfNewProps.length; i++) {
		const item: string = systemEventOfNewProps[i]
		if (isNewly(oldProps, newProps)(item)) {
			const eventType = item.toLowerCase().substring(2)
			dom.addEventListener(eventType, newProps[item])
		}
	}
}
