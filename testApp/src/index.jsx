/* ... */
import frameCountPerSecond from './modules/frameCountPerSecond'
import { setIntervalAnimateMain } from './modules/setIntervalAnimate'
import { updateInnerContentMain } from './modules/updateElementInnerContent'
import { setDocumentBackgroudColor } from './modules/setDocumentBackgroudColor'
/* ... */
import { syncBlock } from './utils/utils'
/* ... */
import Sun, { render, useState, useEffect, createRoot } from '../../src/index'
/* ... */
import { ClickAddLi, ClickAddLongChild } from './component/clickAddLi'
import { TraverseFiberTree } from './component/traverseFiberTree'
import { UseEffectExecSequentialWrapper } from './component/useEffectExecSequential'
import { TimeoutInteractive, IntervalSetCount } from './component/closure'
import { BaseInput } from './component/form'
import { BaseUseCallback } from './component/useCallback'
import { BaseUseMemo } from './component/useMemo'
import { BaseUseRef } from './component/useRef'
import { BaseComponent, Parent as BaseComponentParent, Child as BaseComponentChild, ClockTag } from './component/baseComponent'
import { StandardClock } from './component/standardClock'

function App() {
	console.log(`Component: App`)

	const [count1, setCount1] = useState(1)
	const setCountAction1 = () => {
		setCount1(state => {
			return state + 1
		})
	}
	// useEffect(() => {
	// 	console.log(`************************* App.useEffect 1`)
	// 	setCount1(state => {
	// 		return state + 1
	// 	})
	// }, [])
	// useEffect(() => {
	// 	console.log(`************************* App.useEffect 2`)
	// })

	useEffect(() => {
		// window.setInterval(() => {
		// 	setCount1(state => {
		// 		return state + 1
		// 	})
		// })
	}, [])

	return (
		<div className="row-index" style={{ border: '1px solid red' }} onClick={setCountAction1}>
			<div>{count1}</div>
			<div>{number}</div>
		</div>
	)
}

// Sun.setSyncMode()
/************************************************/
/************************************************/
/************************************************/
render(<StandardClock rootId={Math.random()} />, document.querySelector(`#clockApp`))
/************************************************/
/************************************************/
/************************************************/

const handler = createRoot(document.querySelector(`#app`))
window.setTimeout(() => {
	handler.render(<BaseComponentParent />)
}, 500)

window.addEventListener('DOMContentLoaded', function (e) {
	// setIntervalAnimateMain()
	// frameCountPerSecond()
	// updateInnerContentMain()
	setDocumentBackgroudColor('rgba(185, 185, 185, 0.5)')
})
