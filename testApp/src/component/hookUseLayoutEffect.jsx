/**
 * useLayoutEffect 调用测试
 */
import Sun, { useState, useEffect, useLayoutEffect } from '@/'

export function UseLayoutEffect1() {
	console.log(`Component: UseLayoutEffect1`)
	const [count, setCount] = useState(0)
	const setCountAction = () => {
		// setCount(count + 1)
	}
	useLayoutEffect(() => {
		console.log(`===>>> Hook: hookUseLayoutEffect`)
		console.log(document.getElementById('UseLayoutEffect1Button'))
		console.log(document.getElementById('UseLayoutEffect1Button').innerHTML)
		// setCount(1)
	}, [])
	useEffect(() => {
		console.log(`===>>> Hook: useEffect`)
		console.log(document.getElementById('UseLayoutEffect1Button'))
		console.log(document.getElementById('UseLayoutEffect1Button').innerHTML)
		// setCount(1)
	}, [])
	return (
		<div>
			<button onClick={setCountAction}>Set Count</button>
			<div id="UseLayoutEffect1Button">{count}</div>
		</div>
	)
}
