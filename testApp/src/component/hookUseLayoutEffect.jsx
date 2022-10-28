/**
 * useLayoutEffect 调用测试
 */
import Sun, { useState, useEffect, useLayoutEffect } from '@/'

export function UseLayoutEffectParent1() {
	console.log(`Component: UseLayoutEffectParent1`)
	const [count, setCount] = useState(0)
	const setCountAction = () => {
		// setCount(count + 1)
	}
	useLayoutEffect(() => {
		console.log(`===>>> useLayoutEffect: UseLayoutEffectParent1`)
		console.log(document.getElementById('DDD'))
		console.log(document.getElementById('DDD').innerHTML)
		setCount(1)
	}, [])
	useEffect(() => {
		console.log(`===>>> useEffect: UseLayoutEffectParent1`)
		console.log(document.getElementById('DDD'))
		console.log(document.getElementById('DDD').innerHTML)
		// setCount(1)
	}, [])
	return (
		<div>
			<button onClick={setCountAction}>Set Count</button>
			<section>
				<UseLayoutEffectChild1 />
			</section>
			<div id="DDD">{count}</div>
		</div>
	)
}

function UseLayoutEffectChild1() {
	console.log(`Component: UseLayoutEffectChild1`)
	const [number, setNumber] = useState(0)
	useLayoutEffect(() => {
		console.log(`===>>> useLayoutEffect: UseLayoutEffectChild1`)
	}, [])
	useEffect(() => {
		console.log(`===>>> useEffect: UseLayoutEffectChild1`)
	}, [])
	return <main>{number}</main>
}
