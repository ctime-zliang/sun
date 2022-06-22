import Sun, { useState, useEffect } from '@/'

function A1(props) {
	useEffect(() => {
		console.log(`Component A1 useEffect.`)
		return () => {
			console.log(`Component A1 useEffect callback.`)
		}
	})
	return (
		<div data-tag="A1">
			<B1 />
			<B2 />
			<B3 />
		</div>
	)
}

function B1(props) {
	useEffect(() => {
		console.log(`Component B1 useEffect.`)
		return () => {
			console.log(`Component B1 useEffect callback.`)
		}
	})
	return (
		<div data-tag="B1">
			<C1 />
		</div>
	)
}

function C1(props) {
	useEffect(() => {
		console.log(`Component C1 useEffect.`)
		return () => {
			console.log(`Component C1 useEffect callback.`)
		}
	})
	return <div data-tag="C1">C1</div>
}

function B2(props) {
	useEffect(() => {
		console.log(`Component B2 useEffect.`)
		return () => {
			console.log(`Component B2 useEffect callback.`)
		}
	})
	return <div data-tag="B2">B2</div>
}

function B3(props) {
	useEffect(() => {
		console.log(`Component B3 useEffect.`)
		return () => {
			console.log(`Component B3 useEffect callback.`)
		}
	})
	return (
		<div data-tag="B3">
			<C2 />
			<C3 />
		</div>
	)
}

function C2(props) {
	useEffect(() => {
		console.log(`Component C2 useEffect.`)
		return () => {
			console.log(`Component C2 useEffect callback.`)
		}
	})
	return <div data-tag="C2">C2</div>
}

function C3(props) {
	useEffect(() => {
		console.log(`Component C3 useEffect.`)
		return () => {
			console.log(`Component C3 useEffect callback.`)
		}
	})
	return <div data-tag="C3">C3</div>
}

/*
    A1
    |
    B1 —— B2 —— B3
    |           |
    C1          C2 —— C3

    effect do - mounted
        C1
        B1
        B2
        C2
        C3
        B3
        A1

    effect callback - unmounted
        A1
        B1
        C1
        B2
        B3
        C2
        C3
 */

export function UseEffectExecSequentialWrapper(props) {
	const [count, setCount] = useState(0)
	return (
		<div data-tag="wrapper">
			<button
				data-tag="button"
				onClick={() => {
					setCount(count + 1)
				}}
			>
				Set Count
			</button>
			<span data-tag="span">{count}</span>
			{count <= 2 ? <A1 /> : null}
		</div>
	)
}
