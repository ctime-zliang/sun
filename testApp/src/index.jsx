/* ... */
import frameCountPerSecond from './modules/frameCountPerSecond'
import { setIntervalAnimateMain } from './modules/setIntervalAnimate'
import { updateInnerContentMain } from './modules/updateElementInnerContent'
/* ... */
import Sun, { render, useState, useEffect } from '../../src/index'
import { ClickAddLi, ClickAddLongChild } from './component/clickAddLi'
import { TraverseFiberTree } from './component/traverseFiberTree'
import { UsestateHookIndex, UsestateHookTest } from './component/usestateTest'
import { Outer, Child1 } from './component/propsTest'
import { UseEffectExecSequentialWrapper } from './component/useEffectExecSequential'

const App = () => {
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
	}, [])

	return (
		<div className="row-index" style={{ border: '1px solid red' }} onClick={setCountAction1}>
			{count1}
		</div>
	)
}

render(<UseEffectExecSequentialWrapper />, document.querySelector(`#app`))
// render(<TraverseFiberTree />, document.querySelector(`#app2`))

window.addEventListener('DOMContentLoaded', function (e) {
	// setIntervalAnimateMain()
	// frameCountPerSecond()
	// updateInnerContentMain()
})
