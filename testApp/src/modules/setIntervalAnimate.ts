import { intervalAnimate } from '../utils/utils'

const cache: any = {}

function initView(): void {
	const topContainer: HTMLElement = document.getElementById('area1')
	topContainer.innerHTML = `
        <div style="position: relative; height: 150px;">
            <div id="animateBox" style="position: absolute; width: 100px; height: 100px; background: red;"></div>
        </div>
    `
}

function move(): void {
	intervalAnimate(cache.element, 'width', 800, (): void => {
		intervalAnimate(cache.element, 'width', 100, move)
	})
}

function startMove(): void {
	cache.element = document.querySelector(`#animateBox`) as HTMLElement
	move()
}

export function setIntervalAnimateMain(): void {
	initView()
	startMove()
}
