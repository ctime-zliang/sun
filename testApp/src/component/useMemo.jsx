import Sun, { useState, useEffect, useMemo } from '@/'
import { syncBlock } from '../utils/utils'

export function BaseUseMemo() {
	console.log(`Component: BaseUseMemo`)

	const [count1, setCount1] = useState(1)
	const setCountAction1 = () => {
		setCount1(value => {
			return value + 1
		})
	}

	const number = useMemo(() => {
		syncBlock()
		return count1 * 2
	}, [count1])

	return (
		<div className="row-index" style={{ border: '1px solid red' }} onClick={setCountAction1}>
			<div>{count1}</div>
			<div>{number}</div>
		</div>
	)
}
