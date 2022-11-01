import { TVDom } from './vdom.types'

export type TCreateRootFiberResult = {
	render(element: TVDom): void
}
