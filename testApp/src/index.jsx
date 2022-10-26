/* ... */
import frameCountPerSecond from './modules/frameCountPerSecond'
import { setIntervalAnimateMain } from './modules/setIntervalAnimate'
import { updateInnerContentMain } from './modules/updateElementInnerContent'
import { setDocumentBackgroudColor } from './modules/setDocumentBackgroudColor'
/* ... */
import Sun, { render, createRoot } from '../../src/index'
/* ... */
import { DynamicallyAddChilds1, DynamicallyAddChilds2 } from './component/addChilds'
import { MemoParent, MemoChild1, MemoChild1Memo } from './component/memo'
import { TraverseFiberTree } from './component/traverseFiberTree'
import { TimeoutReadStateOnClosure, IntervalSetCountOnClosure } from './component/closure'
import { FormInput1 } from './component/form'
import { UseCallback1 } from './component/hookUseCallback'
import { UseMemo1 } from './component/hookUseMemo'
import { UseRef1, UseRef2, UseRef3 } from './component/hookUseRef'
import { UseEffectExecOnComponentTree } from './component/hookUseEffectExecOnComponentTree'
import { ClockTag } from './component/clockTag'
import { StandardClock } from './component/standardClock'
import { FragmentElement1 } from './component/fragment'
import { ConditionParent1, ConditionParentG1, ConditionParentG2, ConditionParentG3, ConditionParentG4 } from './component/conditionChilds'
import { UseState1 } from './component/hookUseState'
import { UseEffectInfiniteLoop, UseEffect1, UseEffect2, UseEffect3 } from './component/hookUseEffect'
import { UseLayoutEffect1 } from './component/hookUseLayoutEffect'

function App() {
	console.log(`Component: App`)
	const [text] = Sun.useState('Hello Sun Application')
	const [count, setCount] = Sun.useState(0)
	return (
		<div className="row-index" style={{ border: '1px solid red' }}>
			<div>
				<button
					onClick={() => {
						setCount(count + 1)
					}}
				>
					Set Count({count})
				</button>
			</div>
			<div>{text}</div>
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

createRoot(document.querySelector(`#app`)).render(<App />)
// createRoot(document.querySelector(`#app2`)).render(<App />)

window.addEventListener('DOMContentLoaded', function (e) {
	// setIntervalAnimateMain()
	// frameCountPerSecond()
	// updateInnerContentMain()
	setDocumentBackgroudColor('rgba(185, 185, 185, 0.7)')
})
