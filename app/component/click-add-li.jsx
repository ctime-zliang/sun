import Sun, { useState } from '@/'

export function ClickAddLi() {
	console.log(`Component: ClickAddLi`)
	const [number, setNumber] = useState(0)
	const [list, setList] = useState([])
	const modifyList = () => {
		setNumber(number + 1)
		const array = []
		for (let i = 0; i < number; i++) {
			array.push(i)
		}
		setList(array)
	}
	return (
		<div className="row-view">
			<div onClick={modifyList}>
				Modify List {list.length} - {number}
			</div>
			<ul>
				{list.map((item, index) => {
					return <li>{item}</li>
				})}
			</ul>
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
