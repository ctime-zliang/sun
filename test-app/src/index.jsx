import Sun, { useState } from '../../dist/sun'
import { ClickAddLi, ClickAddLongChild } from './component/click-add-li'
import { TraverseFiberTree } from './component/traverse-fiber-tree'
import { UsestateHookIndex, UsestateHookTest } from './component/usestate-test'
import { Outer, Child1 } from './component/props-test'

const App = () => {
	console.log(`Component: App`)
	const [count1, setCount1] = useState(0)
	const [status, setStatus] = useState(false)
	const setCountAction1 = () => {
		setCount1(state => {
			return state + 1
		})
		setStatus(!status)
	}
	return (
		<div className="row-index" style={{ border: '1px solid red' }}>
			<article onClick={setCountAction1} style="border: 1px solid green">
				{count1} - {status}
			</article>
			{status ? <div tag="true">True 1</div> : <div tag="false">False 1</div>}
			{status ? <div tag="true">True 2</div> : null}
		</div>
	)
}

// Sun.render(<TraverseFiberTree />, document.querySelector(`#app`))
Sun.render(<App />, document.querySelector(`#app2`))

// function fffffff() {
// 	console.log(`Task Start`)
// 	syncBlock(5)
// 	console.log(`Task End`)
// }
// const taskQueue = []
// const createTask = () => {
// 	for (let i = 0; i < 100; i++) {
// 		taskQueue.push(fffffff)
// 	}
// }

// createTask()

// const execTask = () => {
// 	const task = taskQueue.shift()
// 	task()
// }

// const workLoop = (deadline) => {
// 	console.log(`执行 rIC, 检测当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
// 	while (deadline.timeRemaining() > 0 && taskQueue.length > 0) {
// 		execTask()
// 		console.log(`当前帧的剩余时间: ${deadline.timeRemaining()}ms`)
// 	}
// 	if (taskQueue.length) {
// 		window.requestIdleCallback(workLoop)
// 	}
// }

// window.requestIdleCallback(workLoop)
