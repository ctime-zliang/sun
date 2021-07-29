import { RECONCILE_TYPE } from '../config/config'
import { RT_PROFILE } from '../config/runtime.profile'
import { generateStructFiber } from '../utils/utils'

export function reconcileChilren(workInProgressFiber, children) {
	let oldFiber = workInProgressFiber.alternate && workInProgressFiber.alternate.child
	let prevSiblingFiber = null

	/* 
        处理该层 fiber 树的所有子节点
     */
	for (let i = 0; i < children.length || oldFiber != null; i++) {
		let newChildFiber = null
		const element = children[i]
		const sameType = oldFiber && element && element.type == oldFiber.type
		if (sameType) {
			newChildFiber = generateStructFiber({
				dom: null,
				type: element.type,
				props: element.props,
				parent: workInProgressFiber,
				alternate: oldFiber,
				effectTag: RECONCILE_TYPE.UPDATE,
			})
		}
		if (!sameType && element) {
			newChildFiber = generateStructFiber({
				dom: null,
				type: element.type,
				props: element.props,
				parent: workInProgressFiber,
				alternate: null,
				effectTag: RECONCILE_TYPE.PLACEMENT,
			})
		}
		if (oldFiber && !sameType) {
			oldFiber.effectTag = RECONCILE_TYPE.DELETION
			/* 
                记录需要删除的 fiber
             */
			RT_PROFILE.deletions.push(oldFiber)
		}
		if (oldFiber) {
			oldFiber = oldFiber.sibling
		}

		if (i === 0) {
			/* 
				将本次执行 work 时传入的"根" fiber 节点与其第一个 child fiber 节点"串联"
			 */
			workInProgressFiber.child = newChildFiber
		} else {
			/* 
				将 fiber  兄弟节点"串联"
			 */
			prevSiblingFiber.sibling = newChildFiber
		}
		prevSiblingFiber = newChildFiber
	}
	console.log(`当前的 Fiber ===>`, workInProgressFiber)
	return workInProgressFiber
}
