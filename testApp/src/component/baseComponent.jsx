import Sun, { useState, useEffect } from '@/'
import { formatDates } from '../utils/utils'

export function BaseComponent() {
	console.log('Component: BaseComponent')
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
	console.log('Component: Parent')
	const [parentCount, setParentCount] = useState(1)
	const btnClickAction = () => {
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
			<button onClick={btnClickAction}>Set Count</button>
			<div>{parentCount}</div>
			<Child />
		</article>
	)
}

let childTimer = null
let childTimerTick = 0
let childMaxCount = 10 ** 5
export function Child() {
	console.log('Component: Child')
	const [childCount, setChildCount] = useState(1)
	const btnClickAction = () => {
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
			<button onClick={btnClickAction}>Set Number</button>
			<div>{childCount}</div>
		</article>
	)
}

let clockTimer = null
let clockContainerStyle = {
	padding: '10px 0',
	margin: '20px 0',
	borderTop: '1px dashed #000000',
	borderBottom: '1px dashed #000000',
}
export function Clock() {
	console.log('Component: Clock')
	const [clockCount, setClockCount] = useState('xxxx-xx-xx --:--:--')
	const [tagList, setTagList] = useState([])
	const btnClickAtion = () => {
		setTagList(tagList => {
			const allList = [...tagList, clockCount]
			if (allList.length > 10) {
				allList.length = 0
				allList.push(clockCount)
			}
			return allList
		})
	}
	useEffect(() => {
		clockTimer = window.setInterval(() => {
			setClockCount(formatDates())
		})
	}, [])
	return (
		<article data-tagitem="clock" style={clockContainerStyle}>
			<div>{clockCount}</div>
			<button onClick={btnClickAtion}>Set Tag(s)</button>
			<ul>
				{tagList.map((item, index) => {
					return (
						<li>
							{index} - {item}
						</li>
					)
				})}
			</ul>
		</article>
	)
}
