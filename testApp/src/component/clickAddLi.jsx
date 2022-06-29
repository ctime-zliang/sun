import Sun, { useState, useEffect } from '@/'

let len = 0
export function ClickAddLi() {
	console.log(`Component: ClickAddLi`)
	const [list, setList] = useState([1])
	const modifyList = () => {
		const array = []
		len++
		for (let i = 0; i < len; i++) {
			array.push(i)
		}
		setList(array)
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
	const [list, setList] = useState([])
	const modifyList = () => {
		const array = []
		const random = Math.random() + ''
		++count
		for (let i = 0; i < 10000; i++) {
			array.push(random)
		}
		setList(array)
	}
	return (
		<div style={{ border: '1px solid red' }}>
			<button onClick={modifyList}>Modify List {String(list.length)}</button>
			<ul style="border: 1px solid green;">
				{list.map(item => {
					return <LiElement item={item} count={count}></LiElement>
					// return <li>{item}-{count}</li>
				})}
			</ul>
		</div>
	)
}
