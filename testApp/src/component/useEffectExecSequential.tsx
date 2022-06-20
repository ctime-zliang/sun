import React, { useEffect, useState } from 'react'

function A1(props: any) {
	useEffect(() => {
		console.log(`Component A1 useEffect.`)
		return () => {
			console.log(`Component A1 useEffect callback.`)
		}
	})
	return (
		<>
			<B1 />
			<B2 />
			<B3 />
		</>
	)
}

function B1(props: any) {
	useEffect(() => {
		console.log(`Component B1 useEffect.`)
		return () => {
			console.log(`Component B1 useEffect callback.`)
		}
	})
	return (
		<>
			<C1 />
		</>
	)
}

function C1(props: any) {
	useEffect(() => {
		console.log(`Component C1 useEffect.`)
		return () => {
			console.log(`Component C1 useEffect callback.`)
		}
	})
	return <div>C1</div>
}

function B2(props: any) {
	useEffect(() => {
		console.log(`Component B2 useEffect.`)
		return () => {
			console.log(`Component B2 useEffect callback.`)
		}
	})
	return <div>B2</div>
}

function B3(props: any) {
	useEffect(() => {
		console.log(`Component B3 useEffect.`)
		return () => {
			console.log(`Component B3 useEffect callback.`)
		}
	})
	return (
		<>
			<C2 />
			<C3 />
		</>
	)
}

function C2(props: any) {
	useEffect(() => {
		console.log(`Component C2 useEffect.`)
		return () => {
			console.log(`Component C2 useEffect callback.`)
		}
	})
	return <div>C2</div>
}

function C3(props: any) {
	useEffect(() => {
		console.log(`Component C3 useEffect.`)
		return () => {
			console.log(`Component C3 useEffect callback.`)
		}
	})
	return <div>C3</div>
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

export function Wrapper(props: any) {
	const [count, setCount] = useState<number>(0)
	return (
		<>
			<button
				onClick={(): void => {
					setCount(count + 1)
				}}
			>
				Set Count
			</button>
			<span>{count}</span>
			{count <= 2 ? <A1 /> : null}
		</>
	)
}
