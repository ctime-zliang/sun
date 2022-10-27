/**
 *	首屏案例: 经典时钟
 */
import Sun, { useState, useEffect, useRef, useCallback } from '@/'
import { formatDates } from '../utils/utils'

let timer = null
let clockContainerStyle = {
	display: `flex`,
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
}
let clockWrapperStyle = {
	width: `fit-content`,
	transform: `scale(1.5)`,
	transformOrigin: `center center`,
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
}
let splitUnderlineStyle = {
	width: `98%`,
	height: `3px`,
	backgroundColor: `#333333`,
	transform: `scaleX(1) translateY(4px) translateX(1px)`,
}
let dateShowStyle = {
	fontSize: `0.75em`,
	transform: `scaleX(1.3) scaleY(1.15) translateY(5px) translateX(13px)`,
}
let rightAreaStyle = {
	height: `100%`,
}
let timeShowStyle = {
	transform: `scaleY(3.25) scaleX(1.35) translateY(4px) translateX(12px)`,
	textIndent: `5px`,
}
export function StandardClock(props) {
	console.log('Component: StandardClock')
	const [dateValue, setDateValue] = useState(`0000-00-00`)
	const [timeValue, setTimeValue] = useState(`00:00:00`)
	const wrapperRef = useRef(null)
	const resizeHandler = useCallback(() => {
		if (wrapperRef.current) {
			const viewClientWidth = document.documentElement.clientWidth
			wrapperRef.current.style.transform = `scale(${(viewClientWidth / 1000) * 1.75})`
		}
	}, [])
	useEffect(() => {
		timer = window.setInterval(() => {
			const v = formatDates().split(' ')
			setDateValue(v[0])
			setTimeValue(v[1])
		})
		resizeHandler()
		window.addEventListener('resize', resizeHandler)
		return () => {
			window.clearInterval(timer)
			window.removeEventListener('resize', resizeHandler)
		}
	}, [])
	return (
		<div className="clock-container" style={clockContainerStyle}>
			<div ref={wrapperRef} className="clock-wrapper" style={clockWrapperStyle}>
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
