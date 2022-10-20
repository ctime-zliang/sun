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
		<>
			<button onClick={setNumberAction}>Set Number({number})</button>
			<div>
				{number < 3 ? <FragmentChild1 /> : <FragmentChild2 />}
				<span>SPAN CONTENT</span>
			</div>
		</>
	)
}

function FragmentChild1() {
	console.log(`Component: FragmentChild1`)
	return (
		<>
			<section>FragmentChild1 - 1</section>
			<section>FragmentChild1 - 2</section>
			<>FragmentChild1 - 3</>
		</>
	)
}

function FragmentChild2() {
	console.log(`Component: FragmentChild2`)
	return (
		<>
			<article>FragmentChild2 - 1</article>
			<article>FragmentChild2 - 2</article>
		</>
	)
}
