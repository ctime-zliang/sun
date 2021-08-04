import Sun, { useState } from '@/'

let count = 0
export function View() {
	const [list, setList] = useState([])
	const modifyList = () => {
		++count
		const array = []
		for (let i = 0; i < 7000; i++) {
			array.push(count)
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
