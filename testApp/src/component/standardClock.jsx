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
	width: `250px`,
	height: `60px`,
}
let clockWrapperStyle = {
	width: `100%`,
	height: `100%`,
	// transform: `scale(1.5)`,
	transformOrigin: `center center`,
}
let clockContentStyle = {
	color: `#333333`,
	fontSize: `20px`,
	fontWeight: 900,
	whiteSpace: `nowrap`,
	display: `flex`,
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
	width: `100%`,
	height: `100%`,
}
let leftAreaStyle = {
	width: `47%`,
	height: `100%`,
	display: `flex`,
	flexDirection: 'column',
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
}
let tipsShowStyle = {
	transform: `scaleX(1.07)`,
}
let splitUnderlineStyle = {
	width: `100%`,
	height: `3px`,
	backgroundColor: `#333333`,
}
let dateShowStyle = {
	fontSize: `0.75em`,
	transform: `scaleX(1.38)`,
}
let rightAreaStyle = {
	width: `53%`,
	height: `100%`,
	display: `flex`,
	flexDirection: 'column',
	justifyContent: `center`,
	alignItems: `center`,
	alignContent: `center`,
}
let timeShowStyle = {
	transform: `scaleY(2.58) scaleX(1.45)`,
}
export function StandardClock(props) {
	console.log('Component: StandardClock')
	const [dateValue, setDateValue] = useState(`0000-00-00`)
	const [timeValue, setTimeValue] = useState(`00:00:00`)
	const containerRef = useRef(null)
	const resizeHandler = useCallback(() => {
		if (containerRef.current) {
			const viewClientWidth = document.documentElement.clientWidth
			containerRef.current.style.transform = `scale(${(viewClientWidth / 1000) * 1.75})`
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
		<div ref={containerRef} className="clock-container" style={clockContainerStyle}>
			<div className="clock-wrapper" style={clockWrapperStyle}>
				<div className="clock-content" style={clockContentStyle}>
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
