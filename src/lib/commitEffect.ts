import { TFiberNode } from 'src/types/fiber.types'

export function dfs2(fiber: TFiberNode): Array<TFiberNode> {
	const fiberlist: Array<TFiberNode> = []
	const stack: Array<TFiberNode> = []
	let item: TFiberNode
	if (fiber) {
		stack.push(fiber)
		while (stack.length) {
			item = stack.pop() as TFiberNode
			fiberlist.push(item)
			while (item.sibling) {
				stack.push(item)
				item = item.sibling
			}
		}
	}
	return fiberlist
}
