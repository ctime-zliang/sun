import Sun, { useState, useEffect, useRef } from '@/'

export function UseRef1() {
	console.log('Component: UseRef1')
	const [count, setCount] = useState(0)
	const ref = useRef(null)
	ref.current = count
	useEffect(() => {
		window.setInterval(() => {
			// setCount(count + 1)
			// setCount(count => count + 1)
			setCount(ref.current + 1)
		}, 500)
	}, [])
	return (
		<article>
			<div>{count}</div>
		</article>
	)
}
