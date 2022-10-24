/**
 * 基础组件测试
 * 		组件嵌套
 * 		memo 处理
 */
import Sun, { useState, useEffect, memo } from '@/'

export function MemoChild1(props) {
	console.log('Component: Child', props)
	const [childCount, setChildCount] = useState(1)
	const btnClickAction = () => {
		setChildCount(count => {
			return count + 1
		})
	}
	return (
		<article data-tagitem="child">
			<button onClick={btnClickAction}>Set Number</button>
			<div>{childCount}</div>
		</article>
	)
}

export const MemoChild1Memo = memo(MemoChild1)

export function MemoParent(props) {
	console.log('Component: Parent', props)
	const [parentCount, setParentCount] = useState(1)
	const btnClickAction = () => {
		setParentCount(count => {
			return count + 1
		})
	}
	return (
		<article data-tagitem="parent">
			<button onClick={btnClickAction}>Set Count</button>
			<div>{parentCount}</div>
			<MemoChild1 parent={1} />
			<MemoChild1Memo parent={2} />
		</article>
	)
}
