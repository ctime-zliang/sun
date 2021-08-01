export const __RUNTIME_PROFILE___ = {
	/*
		将作为每轮更新时的标志位
		在需要更新且更新前存储顶层 fiber 对象, 在更新完毕后重置为 null
	 */
	workInProgressRootFiber: null,
	workInProgressFiber: null,
	nextWorkUnitFiber: null,
	currentRoot: null,
	/* ... */
	deletions: [],
	/* ... */
	hookIndex: 0,
}
