import Sun, { useState } from '@/'

let len = 0
export function ClickAddLi() {
	console.log(`Component: ClickAddLi`)
	const [list, setList] = useState([1])
	const modifyList = () => {
		const array = []
		for (let i = 0; i < len; i++) {
			array.push(i)
		}
		setList(array)
		len++
	}
	return (
		<div className="row-view">
			<article onClick={modifyList}>Modify List {list.length}</article>
			<main>
				<p>Initial Li</p>
				{list.map((item, index) => {
					return (
						<p>
							<div>{item}</div>
							<div>{item}</div>
						</p>
					)
				})}
			</main>
		</div>
	)
}

let MAX_COUNT = 10000
let COUNT = 0
export function ClickAddLongChild() {
	console.log(`Component: ClickAddLongChild`)
	const [list, setList] = useState([])
	const modifyList = () => {
		const array = []
		COUNT++
		const random = Math.random() + ''
		for (let i = 0; i < MAX_COUNT; i++) {
			array.push(random + ' - ' + COUNT)
		}
		setList(array)
	}
	return (
		<div style={{ border: '1px solid red' }}>
			<button onClick={modifyList}>Modify List {String(list.length)}</button>
			<ul style="border: 1px solid green;">
				{list.map((item, index) => {
					return <li>{item}</li>
				})}
			</ul>
		</div>
	)
}
