import Sun, { useState } from '@/'

export function View() {
	console.log(`Function View`)
	const [list, setList] = useState([])
	const modifyList = () => {
		const array = []
		for (let i = 0; i < 3000; i++) {
			array.push(Math.random())
		}
		setList(array)
	}
	return (
		<div className="row-view">
			<div onClick={modifyList}>Modify List {list.length}</div>
			<ul>
				{list.map((item, index) => {
					return <li>{item}</li>
				})}
			</ul>
		</div>
	)
}
