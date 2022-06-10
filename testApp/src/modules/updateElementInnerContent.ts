const cache: any = {
	isAppend: true,
}

function initView(): void {
	const topContainer: HTMLElement = document.getElementById('area2')
	topContainer.innerHTML = `
        <div>
            <button id="batchBtn">Batch Update Btn</button>
            <ul id="ulistWrapper"></ul>
        </div>
    `
}

function bindEvent(): void {
	const btnElement: HTMLElement = document.getElementById('batchBtn')
	btnElement.addEventListener('click', function (e) {
		updateInnerContent()
	})
}

function updateInnerContent(): void {
	const ulistWrapperElement: HTMLElement = document.getElementById('ulistWrapper')
	const random: string = Math.random() + ''
	if (cache.isAppend) {
		let htmlString: string = ``
		for (let i: number = 0; i < 10000; i++) {
			htmlString += `<li>${random}</li>`
		}
		ulistWrapperElement.innerHTML = htmlString
		return
	}
	const allLiElements: NodeList = ulistWrapperElement.querySelectorAll('li')
	const arrAllLiElements: Array<HTMLElement> = Array.from(allLiElements) as Array<HTMLElement>
	for (let i: number = 0; i < arrAllLiElements.length; i++) {
		arrAllLiElements[i].nodeValue = random
	}
}

export function updateInnerContentMain(): void {
	initView()
	bindEvent()
}
