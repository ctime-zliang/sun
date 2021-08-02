export const __RUNTIME_PROFILE___ = {
	/*
		将作为每轮更新时的标志位
		在需要更新且更新前存储顶层 fiber 对象, 在更新完毕后重置为 null
	 */
	workInProgressFiberOfAppRoot: null,
	/*
		每一轮 rIC 执行时会处理一层 fiber 兄弟节点
		用该标志变量存储当前正在处理的 fiber 节点
	 */
	workInProgressFiberOfNowCompt: null,
	/*
		下一轮 rIC 执行时将要处理的 fiber 树 
	 */
	nextWorkUnitFiber: null,
	/* 
		所有 fiber 提交后用于暂存最终的 workInProgressFiberOfAppRoot fiber 引用
	 */
	currentRootFiber: null,
	/* ... */
	deletions: [],
	/* ... */
	hookIndex: 0,
}
