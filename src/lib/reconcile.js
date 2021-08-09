import { RECONCILE_EFFECT_TYPE } from '../config/config'
import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber } from '../utils/utils'

export function reconcileChilren(wipFiber, deletions) {
	const children = wipFiber.props.children
	/*
		需要清除上一轮更新完毕时保存的上上一轮的当前层 fiber 节点的副本 
	 */
	if (wipFiber.alternate && wipFiber.alternate.alternate) {
		wipFiber.alternate.alternate = null
	}
	/* 
		需要循环遍历当前 vDom 下的所有子节点
		作为参照对比, 此处读取上一轮更新完毕后该层 fiber 节点的第一个子节点
	 */
	let oldFiberOfNowWIPFiber = wipFiber.alternate && wipFiber.alternate.child
	let prevSiblingFiber = null

	/* 
        遍历当前 vDom 下的所有子 vDoms
		逐一生成 fiber 节点并构建成链表
     */
	let i = 0
	for (; i < children.length || oldFiberOfNowWIPFiber != null; i++) {
		let newChildFiber = null
		const element = children[i]
		const sameType = !!(oldFiberOfNowWIPFiber && element && element.type == oldFiberOfNowWIPFiber.type)
		if (sameType) {
			/*
				之前存在的节点, 需要更新 
			 */
			newChildFiber = generateStructFiber({
				stateNode: oldFiberOfNowWIPFiber.stateNode,
				type: element.type,
				props: element.props,
				parent: wipFiber,
				dirty: true,
				alternate: oldFiberOfNowWIPFiber,
				effectTag: RECONCILE_EFFECT_TYPE.UPDATE,
			})
		}
		if (!sameType) {
			/*
				之前不存在的节点, 需要置入 
			 */
			newChildFiber = generateStructFiber({
				stateNode: null,
				type: element.type,
				props: element.props,
				parent: wipFiber,
				dirty: true,
				alternate: null,
				effectTag: RECONCILE_EFFECT_TYPE.PLACEMENT,
			})
		}
		if (!sameType && oldFiberOfNowWIPFiber) {
			oldFiberOfNowWIPFiber.effectTag = RECONCILE_EFFECT_TYPE.DELETION
			deletions.push(oldFiberOfNowWIPFiber)
		}
		/*
			oldFiberOfNowWIPFiber 作为当前 wipFiber 的上一轮更新完毕后的镜像存储节点
			每轮循环中需随着循环进行, 后移到下一个兄弟节点
		 */
		if (oldFiberOfNowWIPFiber) {
			oldFiberOfNowWIPFiber = oldFiberOfNowWIPFiber.sibling
		}

		/* 
			将第一个 child fiber 节点作为本次执行 reconcile 时传入的 fiber 节点的子节点
			
					now-fiber
					/
				   / 
			newChildFiber -- nextNewChildFiber --

			且后续的 child fiber 节点将作为第一个 child fiber 节点的兄弟节点依次串联			
		*/
		if (i === 0) {
			wipFiber.child = newChildFiber
		} else {
			prevSiblingFiber.sibling = newChildFiber
		}
		prevSiblingFiber = newChildFiber
	}
	// console.log(`当前的 Fiber ===>`, wipFiber)
	return wipFiber
}
