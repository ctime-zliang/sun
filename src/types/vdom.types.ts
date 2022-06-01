export type TVDom = {
	type: string
	props: { [key: string]: any }
	children?: Array<TVDom> | Array<any>
	__classOf?: string
}
