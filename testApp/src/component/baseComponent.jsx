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

export function Parent() {
	console.log('Parent')
	const [count, setCount] = useState(0)
	const btnClickAtion = () => {
		setCount(count => {
			return count + 1
		})
	}
	return (
		<article data-tagitem="parent">
			<button onClick={btnClickAtion}>Set Count</button>
			<div>{count}</div>
			<Child />
		</article>
	)
}

let timer = null
let COUNT = 0
export function Child() {
	console.log('Child')
	const [number, setNumber] = useState(0)
	const btnClickAtion = () => {
		setNumber(count => {
			return count + 1
		})
	}
	useEffect(() => {
		timer = window.setInterval(() => {
			setNumber(count => {
				return count + 1
			})
			if (++COUNT >= 1000) {
				window.clearInterval(timer)
			}
		})
	}, [])
	return (
		<article data-tagitem="child">
			<button onClick={btnClickAtion}>Set Number</button>
			<div>{number}</div>
		</article>
	)
}
