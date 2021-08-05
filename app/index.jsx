import Sun, { useState } from '@/'
import { View } from './component/view'

const App = () => {
	const [fontSize, setFontSize] = useState(12)
	const [count1, setCount1] = useState(0)
	const [status, setStatus] = useState(false)
	const setCountAction1 = () => {
		setCount1(state => {
			return state + 1
		})
		window.setTimeout(() => {
			setCount1(Math.random())
		}, 16.67)
		setStatus(!status)
		setFontSize(fontSize + 1)
	}
	// return (
	// 	<div className="row-index" style={{ border: '1px solid red', fontSize: `${fontSize}px` }}>
	// 		{/* <article onClick={setCountAction1} style="border: 1px solid green">
	// 			{count1} - {status}
	// 		</article>
	// 		{status ? <div tag="true">True</div> : <div tag="false">False</div>}
	// 		<View /> */}
	// 		<ul>
	// 			<li data-tag="li-1">Li 1</li>
	// 			<li data-tag="li-2">
	// 				<div>Li 2 div 1</div>
	// 				<div>Li 2 div 2</div>
	// 			</li>
	// 			<li data-tag="li-3">Li 3</li>
	// 		</ul>
	// 	</div>
	// )
	return (
		<ul style={{ border: '1px solid red' }}>
			<li data-tag="li-1">Li 1 - {status} - {fontSize}</li>
			{/* <li></li> */}
			<li data-tag="li-2">
				<div>Li 2 div 1</div>
				<div>Li 2 div 2</div>
			</li>
			<li data-tag="li-3">Li 3</li>
		</ul>
	)
}

let count = 0
let MAX_COUNT = 6000
function LongChild() {
	const [list, setList] = useState([])
	const modifyList = () => {
		++count
		const array = []
		for (let i = 0; i < MAX_COUNT; i++) {
			array.push(i + ' - ' + count)
		}
		setList(array)
	}
	return (
		<div style={{ border: '1px solid red' }}>
			<button onClick={modifyList}>Modify List {String(list.length)}</button>
			<ul style="border: 1px solid green;">
				{list.map((item, index) => {
					return <li>{item}</li>
				})}
			</ul>
		</div>
	)
}

Sun.render(<LongChild />, document.querySelector(`#app`))

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
