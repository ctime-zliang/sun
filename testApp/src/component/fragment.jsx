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
				{number < 3 ? <FragmentChild1 /> : <FragmentChild2 />}
				<h3>AAA CONTENT</h3>
			</div>
		</section>
	)
}

function FragmentChild1() {
	console.log(`Component: FragmentChild1`)
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

function FragmentChild2() {
	console.log(`Component: FragmentChild2`)
	return (
		<>
			<article>FragmentChild2 - 1</article>
			<article>FragmentChild2 - 2</article>
		</>
	)
}

function FunctionComponent() {
	return <div>8888</div>
}
