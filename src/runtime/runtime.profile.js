export const __RUNTIME_PROFILE___ = {
	/* 
		全局的顶层 fiber
	 */	
	fiberRoot: null,
	rootFiber: null,
	rootFiberList: [],
	rootFiberIndex: -1,
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
		所有 fiber 提交后用于暂存最终的 rootFiber fiber 引用
	 */
	currentRootFiber: null,
	/* ... */
	hookIndex: 0,
}
