import Sun, { useState, useEffect } from '@/'

export function UseEffect1() {
	console.log(`Component: UseEffect1`)
	const [count, setCount] = useState(1)
	const setCountAction = () => {
		// setCount(count + 1)
	}
	useEffect(() => {
		console.log(`===>>> Hook: useEffect`)
	})
	return (
		<div>
			<button onClick={setCountAction}>Set Count</button>
			<div>{count}</div>
		</div>
	)
}

export function UseEffect2() {
	console.log(`Component: UseEffect2`)
	const [count, setCount] = useState(1)
	const setCountAction = () => {
		setCount(count + 1)
	}
	// useEffect(() => {
	// 	console.log(`===>>> Hook: useEffect`)
	// })
	useEffect(() => {
		console.log(`===>>> Hook: useEffect`)
	}, [])
	return (
		<div>
			<button onClick={setCountAction}>Set Count</button>
			<div>{count}</div>
			{count <= 1 ? <ChildComponent1 /> : null}
		</div>
	)
}

function ChildComponent1() {
	console.log(`Component: ChildComponent1`)
	useEffect(() => {
		console.log(`--->>> Hook: useEffect - ChildComponent1 - Mounted`)
		return () => {
			console.log(`--->>> Hook: useEffect - ChildComponent1 - Unmounted`)
		}
	}, [])
	return <div>ChildComponent 1</div>
}

export function UseEffectInfiniteLoop() {
	console.log(`Component: UseEffectInfiniteLoop`)
	const [count, setCount] = useState(1)
	useEffect(() => {
		setCount(count => {
			return count + 1
		})
		// setCount(count + 1)
	})
	return (
		<div>
			<div>{count}</div>
		</div>
	)
}

export function UseEffect3() {
	console.log(`Component: UseEffect3`)
	const [count, setCount] = useState(1)
	useEffect(() => {
		console.log(document.getElementById('UseEffect3Element'))
	}, [])
	return (
		<div>
			<div id="UseEffect3Element">{count}</div>
		</div>
	)
}
