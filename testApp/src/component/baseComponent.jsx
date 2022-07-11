import Sun, { useState, useEffect } from '@/'

export function BaseComponent() {
	console.log('BaseComponent')
	const [count, setCount] = useState(0)
	const btnClickAtion = () => {
		setCount(count => {
			return count + 1
		})
	}
	return (
		<article>
			<button onClick={btnClickAtion}>Set Count</button>
			<div>{count}</div>
		</article>
	)
}

let parentTimer = null
let parentTimerTick = 0
export function Parent() {
	console.log('Parent')
	const [parentCount, setParentCount] = useState(0)
	const btnClickAtion = () => {
		setParentCount(count => {
			return count + 1
		})
	}
	useEffect(() => {
		// parentTimer = window.setInterval(() => {
		// 	setParentCount(count => {
		// 		return count + 1
		// 	})
		// 	if (++parentTimerTick >= 1000) {
		// 		window.clearInterval(parentTimer)
		// 	}
		// })
	}, [])
	return (
		<article data-tagitem="parent">
			<button onClick={btnClickAtion}>Set Count</button>
			<div>{parentCount}</div>
			<Child />
		</article>
	)
}

let childTimer = null
let childTimerTick = 0
export function Child() {
	console.log('Child')
	const [childCount, setChildCount] = useState(0)
	const btnClickAtion = () => {
		setChildCount(count => {
			return count + 1
		})
	}
	useEffect(() => {
		childTimer = window.setInterval(() => {
			setChildCount(count => {
				return count + 1
			})
			if (++childTimerTick >= 10) {
				window.clearInterval(childTimer)
			}
		})
	}, [])
	return (
		<article data-tagitem="child">
			<button onClick={btnClickAtion}>Set Number</button>
			<div>{childCount}</div>
		</article>
	)
}
