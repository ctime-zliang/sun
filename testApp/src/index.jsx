// import Sun, { useState } from '../../build/sun'
/* ... */
import frameCountPerSecond from './modules/frameCountPerSecond'
import { setIntervalAnimateMain } from './modules/setIntervalAnimate'
import { updateInnerContentMain } from './modules/updateElementInnerContent'
/* ... */
import Sun, { render, useState } from '../../src/index'
import { ClickAddLi, ClickAddLongChild } from './component/click-add-li'
import { TraverseFiberTree } from './component/traverse-fiber-tree'
import { UsestateHookIndex, UsestateHookTest } from './component/usestate-test'
import { Outer, Child1 } from './component/props-test'

const App = () => {
	const [count1, setCount1] = useState(0)
	const setCountAction1 = () => {
		setCount1(state => {
			return state + 1
		})
	}
	return (
		<div className="row-index" style={{ border: '1px solid red' }} onClick={setCountAction1}>
			<article>{count1}</article>
			<article>{count1}</article>
		</div>
	)
}

// render(<TraverseFiberTree />, document.querySelector(`#app`))
render(<ClickAddLongChild />, document.querySelector(`#app2`))

window.addEventListener('DOMContentLoaded', function (e) {
	setIntervalAnimateMain()
	frameCountPerSecond()
	// updateInnerContentMain()
})
