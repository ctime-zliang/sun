export function createFiber(
    dom = null, 
    type = null, 
    props = null, 
    parent = null, 
    child = null, 
    sibling = null
) {
    return {
        type,
        dom,
        props,
        child,
        parent,
        sibling
    }
}