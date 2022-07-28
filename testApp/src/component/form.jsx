import Sun, { render, useState, useEffect, useMemo } from '@/'

export function BaseInput() {
	const [value, setValue] = useState('initial value')
	const inputInputAction = e => {
		let inputValue = e.target.value
		// if (inputValue.length >= 15) {
		// 	inputValue = inputValue.substring(0, 15)
		// }
		setValue(inputValue)
	}
	return (
		<section>
			<input value={value} onInput={inputInputAction} />
			<div>{value}</div>
		</section>
	)
}
