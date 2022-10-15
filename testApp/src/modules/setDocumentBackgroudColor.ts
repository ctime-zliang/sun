export function setDocumentBackgroudColor(bgColor: string): void {
	const rootElement: HTMLElement = document.documentElement
	rootElement.style.backgroundColor = bgColor
}
