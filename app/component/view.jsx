import Sun, { useState } from '@/'

export function View() {
	const [count2, setCount2] = useState(0)
	const setCountAction2 = () => {
		setCount2(state => {
			return state + 1
		})
	}
	return (
		<div class="row2">
			<button onClick={setCountAction2}>Button View</button>
			<strong>{count2}</strong>
		</div>
	)
}
