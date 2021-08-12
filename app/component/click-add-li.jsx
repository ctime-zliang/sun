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

let count = 0
let MAX_COUNT = 5000
export function ClickAddLongChild() {
	console.log(`Component: ClickAddLongChild`)
	const [list, setList] = useState([])
	const modifyList = () => {
		++count
		const array = []
		for (let i = 0; i < MAX_COUNT; i++) {
			array.push(i + ' - ' + count)
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
