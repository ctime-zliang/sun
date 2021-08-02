import { createElement, createTextElement, render } from './main'
import { useState as useStateHook } from './hooks/use.state'

const Sun = Object.create(null)

Sun.createElement = createElement
Sun.createTextElement = createTextElement
Sun.render = render
Sun.useState = useStateHook

export const useState = useStateHook

export default Sun
