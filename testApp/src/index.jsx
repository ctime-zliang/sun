/* ... */
import frameCountPerSecond from './modules/frameCountPerSecond'
import { setIntervalAnimateMain } from './modules/setIntervalAnimate'
import { updateInnerContentMain } from './modules/updateElementInnerContent'
/* ... */
import { syncBlock } from './utils/utils'
/* ... */
import Sun, { render, useState, useEffect, useMemo } from '../../src/index'
/* ... */
import { ClickAddLi, ClickAddLongChild } from './component/clickAddLi'
import { TraverseFiberTree } from './component/traverseFiberTree'
import { UseEffectExecSequentialWrapper } from './component/useEffectExecSequential'

function App() {
	console.log(`Component: App`)

	const [count1, setCount1] = useState(0)
	const setCountAction1 = () => {
		setCount1(state => {
			return state + 1
		})
	}
	useEffect(() => {
		console.log(`************************* App.useEffect 1`)
		// setCount1(state => {
		// 	return state + 1
		// })
	}, [])
	useEffect(() => {
		console.log(`************************* App.useEffect 2`)
	})

	const number = useMemo(() => {
		// syncBlock()
		return count1 * 2
	}, [])

	return (
		<div className="row-index" style={{ border: '1px solid red' }} onClick={setCountAction1}>
			<div>{count1}</div>
			<div>{number}</div>
			<IntervalUpdateChild />
		</div>
	)
}

function IntervalUpdateChild() {
	console.log(`IntervalUpdateChild`)
	const [count, setCount] = useState(0)
	useEffect(() => {
		// window.setInterval(() => {
		// 	setCount(Math.random())
		// }, 1000)
	}, [])
	return <div>{count}</div>
}

render(<App />, document.querySelector(`#app`), { async: true })
// render(<App />, document.querySelector(`#app2`))

window.addEventListener('DOMContentLoaded', function (e) {
	// setIntervalAnimateMain()
	// frameCountPerSecond()
	// updateInnerContentMain()
})
