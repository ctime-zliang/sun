import { ENUM_EFFECT_TAG } from './effect.enum'

export type TFiber = {
	/* 
        VDOM 属性/fiber 链表节点属性 
    */
	/* 
        FunctionComponent = 函数本身
        ClassComponent = class
        HostComponent = DOM节点 tagName 
    */
	type: any
	elementType: any
	stateNode: any
	props: { [key: string]: any }
	child: any
	parent: any
	sibling: any
	alternate: any
	effectTag: keyof ENUM_EFFECT_TAG
	key: any
	dirty: boolean
	root?: any
	index?: number
	/* 
        hooks 
    */
	hooks: any[]
}
