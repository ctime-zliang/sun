import Sun, { useState } from '@/'

export function Child1(props) {
	// console.log(`Component: Child1`)
	const count = props.count || null
	return (
		<div>
			<div>Child1 Count: {count}</div>
		</div>
	)
}

export function Outer() {
	// console.log(`Component: Outer`)
	const [count, setCount] = useState(1)
	return (
		<div>
			<div
				onClick={() => {
					setCount(count + 1)
				}}
			>
				Outer Count: {count}
			</div>
			<Child1 count={count} />
		</div>
	)
}
