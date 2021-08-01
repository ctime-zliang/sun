import { RECONCILE_TYPE } from '../config/config'
import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { generateStructFiber } from '../utils/utils'

export function reconcileChilren(wipFiber, children = null) {
	children = children || wipFiber.props.children
	let oldFiber = wipFiber.alternate && wipFiber.alternate.child
	let prevSiblingFiber = null

	/* 
        处理该层 fiber 树的所有子节点
     */
	let i = 0
	for (; i < children.length || oldFiber != null; i++) {
		let newChildFiber = null
		const element = children[i]
		const sameType = oldFiber && element && element.type == oldFiber.type
		if (sameType) {
			newChildFiber = generateStructFiber({
				dom: oldFiber.dom,
				type: element.type,
				props: element.props,
				parent: wipFiber,
				alternate: oldFiber,
				effectTag: RECONCILE_TYPE.UPDATE,
			})
		}
		if (!sameType && element) {
			newChildFiber = generateStructFiber({
				dom: null,
				type: element.type,
				props: element.props,
				parent: wipFiber,
				alternate: null,
				effectTag: RECONCILE_TYPE.PLACEMENT,
			})
		}
		if (!sameType && oldFiber) {
			oldFiber.effectTag = RECONCILE_TYPE.DELETION
			/* 
                记录需要删除的 fiber
             */
			__RUNTIME_PROFILE___.deletions.push(oldFiber)
		}
		if (oldFiber) {
			oldFiber = oldFiber.sibling
		}

		if (i === 0) {
			/* 
				将第一个 child fiber 节点作为本次执行 reconcile 时所对应的 fiber 节点的子节点
			 */
			wipFiber.child = newChildFiber
		} else {
			/* 
				将 fiber 兄弟节点"串联"
			 */
			prevSiblingFiber.sibling = newChildFiber
		}
		prevSiblingFiber = newChildFiber
	}
	console.log(`当前的 Fiber ===>`, wipFiber)
	// return wipFiber
}
