export type TVdom = {
	type: string
	props: { [key: string]: any }
	children?: Array<TVdom> | Array<any>
}
