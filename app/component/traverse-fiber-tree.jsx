import Sun, { useState } from '@/'

export function TraverseFiberTree() {
	const [fontSize, setFontSize] = useState(12)
	const [status, setStatus] = useState(false)
	return (
		<ul style={{ border: '1px solid red' }}>
			<li data-tag="li-1">
				Li 1 - {status} - {fontSize}
			</li>
			{/* <li></li> */}
			<li data-tag="li-2">
				<div>Li 2 div 1</div>
				<div>Li 2 div 2</div>
			</li>
			<li data-tag="li-3">Li 3</li>
		</ul>
	)
}
