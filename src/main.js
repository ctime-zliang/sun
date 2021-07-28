import { NODE_TYPE } from './config/config'
import { createFiber } from './utils/utils'

export function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child, index) => {
                return typeof child === 'object' ? child : createTextElement(child)
            })
        }
    }
}

export function createTextElement(text) {
    return {
        type: NODE_TYPE.TEXT_NODE,
        props: {
            nodeValue: text,
            children: [],
        },
    };
}

let nextWorkUnit = null
export function render(element, container) {
    nextWorkUnit = createFiber(
        container,
        container.nodeName.toLowerCase(),
        {
            children: [element]
        }
    )
    console.log(nextWorkUnit)
    // const newNode = element.type === NODE_TYPE.TEXT_NODE ? document.createTextNode(``) : document.createElement(element.type)
    // const props = element.props || {}
    // const children = props.children || []

    // Object.keys(props)
    // .filter((item, index) => {
    //     return item !== 'children'
    // })
    // .forEach((item, index) => {
    //     newNode[item] = props[item]
    // })

    // children.forEach((child, index) => {
    //     render(child, newNode)
    // })

    // container.appendChild(newNode)
}