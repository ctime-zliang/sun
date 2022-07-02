import { __RTP__ } from '../core/runtime'
import { generateFiberStructData } from '../utils/utils'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'
import { TFiberNode } from '../types/fiber.types'
import { TVDom } from '../types/vdom.types'

function createNewChildFiber() {}

export function reconcileChilren(wipFiber: TFiberNode, deletions: Array<TFiberNode>): TFiberNode {
	debugger
	/**
	 * 获取当前 fiber 节点下所有子节点的 vDom 列表
	 * 		fiber 节点的 child 属性将指向该节点的第一个子 fiber 节点
	 * 		fiber 节点的 sibling 属性将指向该节点的下一个兄弟 fiber 节点
	 * 		fiber 节点的 props 属性同 vDom 的 props
	 */
	const children: Array<TVDom> = wipFiber.props.children
	/**
	 * 需要清除上一轮更新完毕时保存的上上一轮的当前层 fiber 节点的引用
	 */
	if (wipFiber.alternate && wipFiber.alternate.alternate) {
		wipFiber.alternate.alternate = null
	}
	/**
	 * 需要循环遍历当前 vDom 下的所有子节点
	 * 作为参照对比, 此处读取上一轮更新完毕后该层 fiber 节点的第一个子节点
	 * 并与本轮更新中当前层 fiber 节点的子节点(vDom)做对比
	 */
	let oldChildFiberOfNowWIPFiber: TFiberNode | null = wipFiber.alternate && wipFiber.alternate.child
	let prevSiblingFiber: TFiberNode | null = null

	let i: number = 0
	for (; i < children.length || oldChildFiberOfNowWIPFiber != null; i++) {
		const childVDomItem: TVDom = children[i]
		let newChildFiber: TFiberNode | null = null
		if (!childVDomItem) {
			/**
			 * 当 oldFiber 无法找到对应的新 fiber 时, 即代表需要删除该节点
			 */
			if (oldChildFiberOfNowWIPFiber) {
				oldChildFiberOfNowWIPFiber.effectTag = ENUM_EFFECT_TAG.DELETION
				oldChildFiberOfNowWIPFiber.dirty = true
				oldChildFiberOfNowWIPFiber.__chm = false
				deletions.push(oldChildFiberOfNowWIPFiber)
				oldChildFiberOfNowWIPFiber = oldChildFiberOfNowWIPFiber.sibling
			}
			continue
		}
		let sameType: boolean = false
		const __triggerUpdate: boolean = !!(oldChildFiberOfNowWIPFiber && oldChildFiberOfNowWIPFiber.__triggerUpdate)
		if (!oldChildFiberOfNowWIPFiber) {
			sameType = false
		} else {
			sameType = childVDomItem.type == oldChildFiberOfNowWIPFiber.type
		}
		if (!__RTP__.triggerUpdateRootFiber && oldChildFiberOfNowWIPFiber && oldChildFiberOfNowWIPFiber.type instanceof Function) {
			console.log(`===========================`)
			newChildFiber = generateFiberStructData({
				stateNode: oldChildFiberOfNowWIPFiber.stateNode,
				type: oldChildFiberOfNowWIPFiber.type,
				props: oldChildFiberOfNowWIPFiber.props,
				parent: wipFiber,
				dirty: false,
				alternate: null,
				effectTag: ENUM_EFFECT_TAG.PLACEMENT,
				hooks: oldChildFiberOfNowWIPFiber.hooks,
			})
		} else if (sameType) {
			/**
			 * 之前存在的节点, 需要更新
			 * 		通过该层的 vDom 重建对应的 fiber 节点
			 */
			newChildFiber = generateFiberStructData({
				stateNode: (oldChildFiberOfNowWIPFiber as TFiberNode).stateNode,
				type: childVDomItem.type,
				props: childVDomItem.props,
				parent: wipFiber,
				dirty: true,
				alternate: oldChildFiberOfNowWIPFiber,
				effectTag: ENUM_EFFECT_TAG.UPDATE,
				__triggerUpdate,
				/* 需要将 hooks 置空 */
				hooks: [],
			})
		} else {
			/**
			 * 之前不存在的节点, 需要新建并插入
			 * 		通过该层的 vDom 创建对应的 fiber 节点
			 */
			newChildFiber = generateFiberStructData({
				stateNode: null,
				type: childVDomItem.type,
				props: childVDomItem.props,
				parent: wipFiber,
				dirty: true,
				alternate: null,
				effectTag: ENUM_EFFECT_TAG.PLACEMENT,
				/* 需要将 hooks 置空 */
				hooks: [],
			})
			if (oldChildFiberOfNowWIPFiber) {
				oldChildFiberOfNowWIPFiber.effectTag = ENUM_EFFECT_TAG.DELETION
				oldChildFiberOfNowWIPFiber.dirty = true
				oldChildFiberOfNowWIPFiber.__chm = false
				deletions.push(oldChildFiberOfNowWIPFiber)
			}
		}
		/**
		 * oldChildFiberOfNowWIPFiber 作为当前 wipFiber 的上一轮更新完毕后的镜像(引用持有)存储节点
		 * 每轮循环中需随着循环进行, 后移到下一个兄弟节点
		 */
		if (oldChildFiberOfNowWIPFiber) {
			oldChildFiberOfNowWIPFiber = oldChildFiberOfNowWIPFiber.sibling
		}
		/**
		 * 将第一个 child fiber 节点作为本次执行 reconcile 时传入的 fiber 节点的子节点
		 *
		 * 		now-fiber(wipFiber)
		 *  	 /
		 * 		/
		 * newChildFiber -- nextNewChildFiber --
		 *
		 * 且后续的 child fiber 节点将作为第一个 child fiber 节点的兄弟节点依次串联
		 */
		if (i === 0) {
			wipFiber.child = newChildFiber
		} else if (prevSiblingFiber) {
			prevSiblingFiber.sibling = newChildFiber
		}
		prevSiblingFiber = newChildFiber
	}
	return wipFiber
}
