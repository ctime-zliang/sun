import Sun, { useState } from '@/'

const UsestateHookTest = () => {
	const [number, setNumber] = useState(1)
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
	return (
		<main className="row-index" style={{ border: '1px solid red' }}>
			<UsestateHookTest />
			<UsestateHookTest />
		</main>
	)
}
