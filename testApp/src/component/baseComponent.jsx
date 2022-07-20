import Sun, { useState, useEffect } from '@/'
import { formatDates } from '../utils/utils'

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
let parentMaxCount = 10
export function Parent() {
	console.log('Parent')
	const [parentCount, setParentCount] = useState(1)
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
		// 	if (++parentTimerTick >= parentMaxCount - 1) {
		// 		window.clearInterval(parentTimer)
		// 	}
		// }, 500)
		// setParentCount(val => {
		// 	return val + 1
		// })
		// setParentCount(val => {
		// 	return val + 1
		// })
		// setParentCount(val => {
		// 	return val + 1
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
let childMaxCount = 10 ** 5
export function Child() {
	console.log('Child')
	const [childCount, setChildCount] = useState(1)
	const btnClickAtion = () => {
		setChildCount(count => {
			return count + 1
		})
	}
	useEffect(() => {
		// childTimer = window.setInterval(() => {
		// 	setChildCount(count => {
		// 		return count + 1
		// 	})
		// 	if (++childTimerTick >= childMaxCount - 1) {
		// 		window.clearInterval(childTimer)
		// 	}
		// }, 1000)
		// setChildCount(val => {
		// 	return val + 1
		// })
		// setChildCount(val => {
		// 	return val + 1
		// })
		// setChildCount(val => {
		// 	return val + 1
		// })
	}, [])
	return (
		<article data-tagitem="child">
			<button onClick={btnClickAtion}>Set Number</button>
			<div>{childCount}</div>
		</article>
	)
}

let clockTimer = null
export function Clock() {
	console.log('Clock')
	const [clockCount, setClockCount] = useState(formatDates())
	const btnClickAtion = () => {
		setClockCount(() => {
			return formatDates()
		})
	}
	useEffect(() => {
		clockTimer = window.setInterval(() => {
			setClockCount(() => {
				return formatDates()
			})
		})
	}, [])
	return (
		<article data-tagitem="clock">
			<button onClick={btnClickAtion}>Update Clock</button>
			<div>{clockCount}</div>
		</article>
	)
}
