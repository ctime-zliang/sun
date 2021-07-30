import Sun, { useState } from '@/'
import { View } from './component/view'

const App = () => {
	const [count1, setCount1] = useState(0)
	const setCountAction1 = () => {
		setCount1(state => {
			return state + 1
		})
	}
	const [count2, setCount2] = useState(0)
	const setCountAction2 = () => {
		setCount2(state => {
			return state + 1
		})
	}
	return (
		<main>
			<div class="row1">
				<button onClick={setCountAction1}>Button</button>
				<strong>{count1}</strong>
			</div>
			<div class="row2">
				<button onClick={setCountAction2}>Button</button>
				<strong>{count2}</strong>
			</div>
		</main>
	)
}

const Index = (
	<main>
		<div class="row1">
			<button>Button</button>
			<strong>Strong</strong>
		</div>
		<div class="row2">
			<button>Button</button>
			<strong>Strong</strong>
		</div>
	</main>
)

console.log(Index)
console.log(<App />)  // 调用函数组件
Sun.render(<App />, document.querySelector(`#app`))

// const syncBlock = (delay = 500) => {
// 	const end = new Date().getTime() + delay
// 	while (new Date().getTime() < end) {}
// }

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
