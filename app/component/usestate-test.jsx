import Sun, { useState } from '@/'

export function UsestateHookTest() {
	const [number, setNumber] = useState(200)
	const clickAction = () => {
		setNumber(number + 1)
	}
	return (
		<div>
			<span onClick={clickAction} style="display: block;">
				{number}
			</span>
		</div>
	)
}
export function UsestateHookIndex() {
	const [count, setCount] = useState(100)
	return (
		<main className="row-index" style={{ border: '1px solid red' }}>
			<UsestateHookTest />
			<UsestateHookTest />
			<div onClick={setCount}>count: {count}</div>
		</main>
	)
}
