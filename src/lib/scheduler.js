import { createDOM } from '../lib/dom'
import { generateStructFiber, syncBlock } from '../utils/utils'

export function initWorkLoop(nextWorkUnit, workInProgress) {
	function workLoop(deadline) {
        console.log('\n')
		console.log(`执行 rIC, 检测当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
		let shouldYield = false
		while (nextWorkUnit && !shouldYield) {
			nextWorkUnit = performUnitWork(nextWorkUnit)
            syncBlock(300)
			shouldYield = deadline.timeRemaining() < 1
			console.log(`当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
		}
        
        /* 
            nextWorkUnit 不存在时
                即 整个 fiber 树已经构建并遍历完成
                即可以开始提交并更新 DOM
         */
		if (!nextWorkUnit && workInProgress) {
            console.log('\n')
            console.log('commitWork ===> ', workInProgress)
			commitWork(workInProgress.child)
			workInProgress = null
		} else {
            window.requestIdleCallback(workLoop)
        }
		
	}

	return workLoop
}

export function performUnitWork(fiber) {
	if (!fiber.dom) {
		fiber.dom = createDOM(fiber)
	}

	let prevSibling = null
	const children = fiber.props.children
	for (let i = 0; i < children.length; i++) {
		const element = children[i]
		const newFiber = generateStructFiber(null, element.type, element.props, fiber, null, null)
		if (i === 0) {
			fiber.child = newFiber
		} else {
			prevSibling.sibling = newFiber
		}
		prevSibling = newFiber
	}
	console.log(`当前的 Fiber ===>`, fiber)

	if (fiber.child) {
		return fiber.child
	}
	while (fiber) {
		if (fiber.sibling) {
			return fiber.sibling
		}
		fiber = fiber.parent
	}
	return null
}

export function commitWork(fiber) {
	if (!fiber) {
		return
	}
	fiber.parent.dom.appendChild(fiber.dom)
	commitWork(fiber.child)
	commitWork(fiber.sibling)
}
