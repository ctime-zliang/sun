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
	const dom = fiber.elementType === NODE_TYPE.TEXT_NODE ? document.createTextNode(``) : document.createElement(fiber.elementType)
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
	systemEventOfOldProps
		.filter((item, index) => {
			return !(item in newProps) || isNewly(oldProps, newProps)(item)
		})
		.forEach((item, index) => {
			const eventType = item.toLowerCase().substring(2)
			dom.removeEventListener(eventType, oldProps[item])
		})
	/* 
		删除旧属性
	 */
	commPropsOfOldProps.filter(isOld(oldProps, newProps)).forEach((item, index) => {
		dom[item] = undefined
		if (dom.removeAttribute) {
			dom.removeAttribute(item)
		}
	})
	/*
		更新 or 写入新属性 
	 */
	commPropsOfNewProps.filter(isNewly(oldProps, newProps)).forEach((item, index) => {
		switch (item) {
			case 'style': {
				if (typeof newProps[item] == 'object') {
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
	})
	/*
		系统事件处理 - 设置
	 */
	systemEventOfNewProps.filter(isNewly(oldProps, newProps)).forEach((item, index) => {
		const eventType = item.toLowerCase().substring(2)
		dom.addEventListener(eventType, newProps[item])
	})
}
