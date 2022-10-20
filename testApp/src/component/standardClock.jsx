import Sun, { useState, useEffect, memo } from '@/'
import { formatDates } from '../utils/utils'

let timer = null
let clockContainerStyle = {
	display: `flex`,
	justifyContent: `center`,
}
let clockWrapperStyle = {
	width: `fit-content`,
	transform: `scale(1.5)`,
}
let clockCotentStyle = {
	color: `#333333`,
	fontSize: `20px`,
	fontWeight: 900,
	whiteSpace: `nowrap`,
	display: `flex`,
}
let leftAreaStyle = {
	height: `100%`,
}
let tipsShowStyle = {
	transform: `scaleY(1.5)`,
	transformOrigin: `left top`,
}
let splitUnderlineStyle = {
	width: `98%`,
	height: `3px`,
	backgroundColor: `#444444`,
	transform: `scaleX(1) translateY(0.5em) translateX(0.05em)`,
	transformOrigin: `left top`,
}
let dateShowStyle = {
	fontSize: `0.75em`,
	transform: `scaleX(1.3) translateY(0.6em)`,
	transformOrigin: `left top`,
}
let rightAreaStyle = {
	height: `100%`,
}
let timeShowStyle = {
	transform: `scaleY(3) scaleX(1.05) translateY(-0.155em)`,
	transformOrigin: `left top`,
	textIndent: `5px`,
}
export function StandardClock(props) {
	console.log('Component: StandardClock')
	const [dateValue, setDateValue] = useState(`yyyy-mm-dd`)
	const [timeValue, setTimeValue] = useState(`hh:mm:ss`)
	useEffect(() => {
		timer = window.setInterval(() => {
			const v = formatDates().split(' ')
			setDateValue(v[0])
			setTimeValue(v[1])
		})
		return () => {
			window.clearInterval(timer)
		}
	}, [])
	return (
		<div className="clock-container" style={clockContainerStyle}>
			<div className="clock-wrapper" style={clockWrapperStyle}>
				<div className="clock-content" style={clockCotentStyle}>
					<div className="left-area" style={leftAreaStyle}>
						<div className="tips-show" style={tipsShowStyle}>
							<span>NOW TIME</span>
						</div>
						<div className="split-underline" style={splitUnderlineStyle}></div>
						<div className="date-show" style={dateShowStyle}>
							<span>{dateValue}</span>
						</div>
					</div>
					<div className="right-area" style={rightAreaStyle}>
						<div className="time-show" style={timeShowStyle}>
							<span>{timeValue}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
