import Sun, { useState } from '../../build/sun'
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
