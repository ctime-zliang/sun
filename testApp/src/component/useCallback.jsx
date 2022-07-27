import Sun, { useState, useEffect, useCallback } from '@/'

const sourceCallback = () => {
	console.log(`123456`)
}
let flagA = null
export function BaseUseCallback() {
	console.log('Component: BaseUseCallback')
	const [count, setCount] = useState(0)
	const btnClickAction = () => {
		setCount(count + 1)
	}
	const callback = useCallback(sourceCallback, [count])
	if (!flagA) {
		flagA = callback
	}
	console.log(flagA === callback)
	return (
		<article>
			<button onClick={btnClickAction}>Set Count</button>
			<div>{count}</div>
		</article>
	)
}
