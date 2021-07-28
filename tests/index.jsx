/* 
	https://jelly.jd.com/article/60aceb6b27393b0169c85231
	https://pomb.us/build-your-own-react/
 */

import Sun from '@/'
import { View } from './component/view'

const App = (
	<div style="color: red;">
		<span>666</span>
	</div>
)

Sun.render(App, document.querySelector(`#app`))



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