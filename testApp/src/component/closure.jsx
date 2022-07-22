import Sun, { useState, useEffect } from '@/'

export function TimeoutInteractive() {
	console.log('Component: TimoutInteractive')
	const [count, setCount] = useState(0)
	const btnClickAction = () => {
		setCount(count + 1)
		window.setTimeout(() => {
			console.log(count)
		}, 3000)
	}
	return (
		<article>
			<button onClick={btnClickAction}>Set Count</button>
			<div>{count}</div>
		</article>
	)
}

export function IntervalSetCount() {
	console.log('Component: IntervalSetCount')
	const [count, setCount] = useState(0)
	useEffect(() => {
		window.setInterval(() => {
			setCount(count + 1)
			// setCount(count => count + 1)
		}, 500)
	}, [])
	return (
		<article>
			<div>{count}</div>
		</article>
	)
}
