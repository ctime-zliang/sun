import { createElement, createTextElement, render as _render } from './main'
import { useState as useStateHook } from './hooks/useState'

const Sun = Object.create(null)

Sun.createElement = createElement
Sun.createTextElement = createTextElement
Sun.render = _render
Sun.useState = useStateHook

export const render: (element: any, containe: HTMLElement) => void = _render
export const useState = useStateHook

export default Sun
