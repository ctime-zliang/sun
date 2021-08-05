import { __RUNTIME_PROFILE___ } from '../runtime/runtime.profile'
import { RECONCILE_TYPE } from '../config/config'
import { updateDOM, commitAppendChild, commitDeleteChild } from './dom'

function domOpreation(fiber) {
    if (!fiber.stateNode) {
        return
    }
    /* 
        向上查找以找到最近的包含 DOM 的 fiber 节点
    */
    let parentFiber = fiber.parent
    while (!parentFiber.stateNode) {
        parentFiber = parentFiber.parent
    }
    const referenceDom = parentFiber.stateNode
    if (fiber.effectTag === RECONCILE_TYPE.PLACEMENT) {
        commitAppendChild(fiber.stateNode, referenceDom)
    } else if (fiber.effectTag === RECONCILE_TYPE.DELETION) {
        commitDeleteChild(fiber, referenceDom)
    } else if (fiber.effectTag === RECONCILE_TYPE.UPDATE) {
        updateDOM(fiber.stateNode, fiber.alternate.props, fiber.props)
    }
}

function walk(fiber) {debugger
    let root = fiber
    let current = fiber

    while (current) {
        if (current.child) {
            current = current.child
            domOpreation(current)
            continue
        }
        if (current === root) {
            return
        }
        while (!current.sibling) {
            if (!current.parent || current.parent === root) {
                return
            }
            domOpreation(current)
            current = current.parent           
        }
        current = current.sibling
    }
}

export function commitWork(fiber) {
	if (!fiber) {
		return
	}
    walk(fiber)
    return
	domOpreation(fiber)
	/*
		深度递归 
			提交渲染子节点
	 */
	if (fiber.child) {
		commitWork(fiber.child)
	}
	/*
		广度递归 
			提交渲染兄弟节点
	 */
	if (fiber.sibling) {
		commitWork(fiber.sibling)
	}
}
