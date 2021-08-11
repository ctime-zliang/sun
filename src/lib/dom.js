import { NODE_TYPE } from '../config/config'
import { isProperty, isOld, isNewly, isSystemEvent } from '../utils/utils'

/**
 * 追加 DOM
 * @param {object} childDom 被追加的子节点
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function commitAppendChild(childDom, parentDom) {
	parentDom.appendChild(childDom)
}

/**
 * 移除 DOM
 * @param {object} fiber fiber 节点对象
 * @param {object} parentDom 目标父节点
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function commitDeleteChild(fiber, parentDom) {
	if (fiber.stateNode) {
		parentDom.removeChild(fiber.stateNode)
	} else {
		commitDeletion(fiber.child, parentDom)
	}
}

/**
 * 创建 标准 DOM 对象
 * @param {object} fiber fiber 节点对象
 * @return {htmlelement} 元素 HTMLElement 对象
 */
export function createDOM(fiber) {
	const dom = fiber.type === NODE_TYPE.TEXT_NODE ? document.createTextNode(``) : document.createElement(fiber.type)
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
export function updateDOM(dom, oldProps, newProps) {
	const systemEventOfOldProps = Object.keys(oldProps).filter(isSystemEvent)
	const systemEventOfNewProps = Object.keys(newProps).filter(isSystemEvent)
	const commPropsOfOldProps = Object.keys(oldProps).filter(isProperty)
	const commPropsOfNewProps = Object.keys(newProps).filter(isProperty)

	/*
		系统事件处理 - 移除 
	 */
	for (let i = 0; i < systemEventOfOldProps.length; i++) {
		const item = systemEventOfOldProps[i]
		if (!(item in newProps) || isNewly(oldProps, newProps)(item)) {
			const eventType = item.toLowerCase().substring(2)
			dom.removeEventListener(eventType, oldProps[item])
		}
	}
	/* 
		删除旧属性
	 */
	for (let i = 0; i < commPropsOfOldProps.length; i++) {
		const item = commPropsOfOldProps[i]
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
	for (let i = 0; i < commPropsOfNewProps.length; i++) {
		const item = commPropsOfNewProps[i]
		if (isNewly(oldProps, newProps)(item)) {
			switch (item) {
				case 'style': {
					if (Object.prototype.toString.call(newProps[item]).toLowerCase() === '[object object]') {
						for (let attr in newProps[item]) {
							dom.style[attr] = newProps[item][attr]
						}
						break
					}
					dom[item] = newProps[item]
					break
				}
				case 'className': {
					dom[item] = newProps[item]
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
	/*
		系统事件处理 - 设置
	 */
	for (let i = 0; i < systemEventOfNewProps.length; i++) {
		const item = systemEventOfNewProps[i]
		if (isNewly(oldProps, newProps)(item)) {
			const eventType = item.toLowerCase().substring(2)
			dom.addEventListener(eventType, newProps[item])
		}
	}
}
