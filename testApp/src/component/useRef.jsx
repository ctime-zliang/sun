import Sun, { useState, useEffect, useRef } from '@/'

export function BaseUseRef() {
	console.log('Component: BaseUseRef')
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
