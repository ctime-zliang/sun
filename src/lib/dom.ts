import { isProperty, isOld, isNewly, isSystemEvent } from '../utils/utils'
import { ENUM_NODE_TYPE } from '../config/effect.enum'
import { IHHTMLElement, ITHTMLElement } from '../types/dom.types'
import { TFiberNode } from 'src/types/fiber.types'

/**
 * 追加 DOM
 * @param {object} childDom 被追加的子节点
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function commitAppendChild(childDom: HTMLElement | Text, parentDom: HTMLElement | Text | null): void {
	if (!parentDom) {
		return
	}
	parentDom.appendChild(childDom)
}

/**
 * 移除 DOM
 * @param {object} fiber fiber 节点对象
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function commitDeleteChild(fiber: TFiberNode, parentDom: HTMLElement | Text | null): void {
	if (!parentDom) {
		return
	}
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
export function createDOM(fiber: TFiberNode): HTMLElement | Text {
	const dom: HTMLElement | Text =
		fiber.type === ENUM_NODE_TYPE.TEXT_NODE ? document.createTextNode(``) : document.createElement(fiber.type as string)
	updateDOM(dom, {}, fiber.props as { [key: string]: any })
	return dom
}

/**
 * 更新 DOM
 * @param {object} dom HTMLElement 节点对象
 * @param {object} oldProps Props 属性对象
 * @param {object} newProps Props 属性对象
 * @return {htmlelement} 元素 DOM 对象
 */
export function updateDOM(dom: HTMLElement | Text, oldProps: { [key: string]: any } = {}, newProps: { [key: string]: any } = {}): void {
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
			;(dom as any)[item] = undefined
			if ((dom as any).removeAttribute) {
				;(dom as any).removeAttribute(item)
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
							;(dom as any).style[attr] = newProps[item][attr]
						}
						break
					}
					// dom[item] = newProps[item]
					break
				}
				case 'className': {
					;(dom as any)[item] = newProps[item]
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
