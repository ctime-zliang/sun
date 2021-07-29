import Sun, { useState } from '@/'
import { View } from './component/view'

const App = () => {
	const [state, setState] = useState(1)
	const onInput = e => {
		console.log(e.target.value)
	}
	const btnAction = () => {
		setState(state => {
			return state + 1
		})
	}
	// const state = 1
	return (
		<div id="divId">
			<input onInput={onInput} value={state} />
			<button onClick={btnAction}>Btn</button>
		</div>
	)
}

console.log(<App />)
Sun.render(<App />, document.querySelector(`#app`))

// const taskQueue = [
// 	() => {
// 		console.log(`Task 1 Start`)
// 		console.log(`Task 1 End`)
// 	},
// 	() => {
// 		console.log(`Task 2 Start`)
// 		console.log(`Task 2 End`)
// 	},
// 	() => {
// 		console.log(`Task 3 Start`)
// 		console.log(`Task 3 End`)
// 	}
// ]

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
