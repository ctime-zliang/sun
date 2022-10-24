/**
 * Fragment Element
 */
import Sun, { useState, useEffect } from '@/'

export function FragmentElement1() {
	console.log(`Component: FragmentElement1`)
	const [number, setNumber] = useState(0)
	const setNumberAction = () => {
		setNumber(number => {
			return number + 1
		})
	}
	return (
		<section>
			<button onClick={setNumberAction}>Set Number({number})</button>
			<div>
				{number < 1 ? <FragmentChildA /> : <FragmentChildB />}
				<ConditionChild0 />
				<h3>FragmentElement1 CONTENT</h3>
			</div>
		</section>
	)
}

function ConditionChild0() {
	console.log(`Component: ConditionChild0 CONTENT`)
	return <h2>ConditionChild0 CONTENT</h2>
}

function FragmentChildA() {
	console.log(`Component: FragmentChildA`)
	return (
		<>
			<FragmentChild11 />
			<FragmentChild11 />
		</>
	)
}

function FragmentChild11() {
	console.log(`Component: FragmentChild11`)
	return (
		<>
			<section>FragmentChild1 - 1</section>
			<section>FragmentChild1 - 2</section>
			<section>
				<>FragmentChild1 - 3</>
			</section>
			<>
				<section>FragmentChild1 - 4</section>
			</>
			<>FragmentChild1 - 5</>
		</>
	)
}

function FragmentChildB() {
	console.log(`Component: FragmentChildB`)
	return (
		<>
			<FragmentChild21 />
			<FragmentChild21 />
		</>
	)
}

function FragmentChild21() {
	console.log(`Component: FragmentChild21`)
	return (
		<>
			<article>FragmentChild2 - 1</article>
			<article>FragmentChild2 - 2</article>
		</>
	)
}
