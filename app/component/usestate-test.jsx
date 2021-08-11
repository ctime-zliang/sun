import Sun, { useState } from '@/'

export function UsestateHookTest() {
	console.log(`Component: UsestateHookTest`)
	const [number, setNumber] = useState(200)
	const clickAction = () => {
		setNumber(number + 1)
	}
	return (
		<main>
			<div onClick={clickAction} style="display: block;">
				{number}
			</div>
		</main>
	)
}

export function UsestateHookIndex() {
	console.log(`Component: UsestateHookIndex`)
	const [count, setCount] = useState(100)
	return (
		<main className="row-index" style={{ border: '1px solid red' }}>
			<UsestateHookTest />
			<div
				onClick={() => {
					setCount(count + 1)
				}}
			>
				count: {count}
			</div>
		</main>
	)
}
