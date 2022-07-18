import Sun, { useState, useEffect } from '@/'

let len = 2
export function ClickAddLi() {
	console.log(`Component: ClickAddLi`)

	const [list, setList] = useState([1, 2])
	const modifyList = () => {
		const array = []
		len++
		for (let i = 0; i < len; i++) {
			array.push(i + 1)
		}
		setList(array)
	}

	return (
		<div className="row-view">
			<button onClick={modifyList}>Add List {list.length}</button>
			<main>
				{list.map((item, index) => {
					return <div>List {item}</div>
				})}
			</main>
		</div>
	)
}

function LiElement(props) {
	const { item, count } = props
	useEffect(() => {
		console.log(item)
	}, [])
	return (
		<li>
			{item} - {count}
		</li>
	)
}
let count = 0
export function ClickAddLongChild() {
	console.log(`Component: ClickAddLongChild`)

	const [list, setList] = useState([])
	const modifyList = () => {
		const array = []
		const random = Math.random() + ''
		++count
		for (let i = 0; i < 30000; i++) {
			array.push(random)
		}
		// console.log('modifyList - count: ', count)
		setList(array)
	}
	return (
		<div style={{ border: '1px solid red' }}>
			<button onClick={modifyList}>Modify List {String(list.length)}</button>
			<ul style="border: 1px solid green;">
				{list.map(item => {
					// return <LiElement item={item} count={count}></LiElement>
					return (
						<li>
							{item}-{count}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
