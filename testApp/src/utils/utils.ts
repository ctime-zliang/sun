export function getElementStyle(element: HTMLElement, name: string): string {
	if ((element as any).currentStyle) {
		return (element as any).currentStyle[name]
	}
	return window.getComputedStyle(element, null)[name]
}

export function intervalAnimate(element: HTMLElement, attr: string, target: number, callback: () => void): void {
	window.clearInterval((element as any).timer)
	;(element as any).timer = window.setInterval((): void => {
		let cur: number = 0
		if (attr === 'opacity') {
			cur = Math.round(parseFloat(getElementStyle(element, attr)) * 100)
		} else {
			cur = parseInt(getElementStyle(element, attr))
		}
		let speed: number = (target - cur) / 10
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
		if (target === cur) {
			window.clearInterval((element as any).timer)
			callback && callback()
		} else {
			if (attr === 'opacity') {
				element.style.filter = 'alpha(opacity:' + (cur + speed) + ')'
				element.style.opacity = String((cur + speed) / 100)
			} else {
				element.style[attr] = cur + speed + 'px'
			}
		}
	}, 16.67)
}