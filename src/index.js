import { createElement, createTextElement, render } from './main'

const Sun = Object.create(null)

Sun.createElement = createElement
Sun.createTextElement = createTextElement
Sun.render = render

export default Sun