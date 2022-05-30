import { __RUNTIME_PROFILE___ } from '../core/runtimeProfile'
import { generateStructFiber } from '../utils/utils'
import { ENUM_EFFECT_TAG } from '../config/effect.enum'

export function reconcileChilren(wipFiber, deletions: any[]) {
	const children: { [key: string]: any } = wipFiber.props.children
	/*
		需要清除上一轮更新完毕时保存的上上一轮的当前层 fiber 节点的引用
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

	let i: number = 0
	for (; i < children.length || oldFiberOfNowWIPFiber != null; i++) {
		let newChildFiber = null
		if (!children[i]) {
			/*
				当 oldFiber 无法找到对应的新 fiber 时, 即代表需要删除该节点 
			 */
			if (oldFiberOfNowWIPFiber) {
				oldFiberOfNowWIPFiber.effectTag = ENUM_EFFECT_TAG.DELETION
				oldFiberOfNowWIPFiber.dirty = true
				deletions.push(oldFiberOfNowWIPFiber)
				oldFiberOfNowWIPFiber = oldFiberOfNowWIPFiber.sibling
			}
			continue
		}
		const element = children[i]
		const sameType: boolean = !!(oldFiberOfNowWIPFiber && element.type == oldFiberOfNowWIPFiber.type)
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
				effectTag: ENUM_EFFECT_TAG.UPDATE,
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
				effectTag: ENUM_EFFECT_TAG.PLACEMENT,
			})
		}
		if (!sameType && oldFiberOfNowWIPFiber) {
			oldFiberOfNowWIPFiber.effectTag = ENUM_EFFECT_TAG.DELETION
			oldFiberOfNowWIPFiber.dirty = true
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
	return wipFiber
}
