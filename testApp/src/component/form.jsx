import Sun, { render, useState, useEffect, useMemo } from '@/'

export function BaseInput() {
	const [value, setValue] = useState('initial value')
	const inputInputAction = e => {
		setValue(e.target.value)
	}
	return (
		<section>
			<input value={value} onInput={inputInputAction} />
			<div>{value}</div>
		</section>
	)
}
