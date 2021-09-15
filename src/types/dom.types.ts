export interface IHHTMLElement extends HTMLElement {}

export interface ITHTMLElement extends Text {
	removeAttribute?: (...args: any) => void
	style?: any
	[key: string]: any
}
