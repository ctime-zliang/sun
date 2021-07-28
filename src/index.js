/* 
	https://jelly.jd.com/article/60aceb6b27393b0169c85231
	https://pomb.us/build-your-own-react/
	https://jelly.jd.com/article/60d82ae9625de10174c73860

    https://jelly.jd.com/article/60a623e40801420171d9b090
    https://jelly.jd.com/article/60d82e8b78b202017b2949d1
    https://jelly.jd.com/article/60580a7f960312017f4b5231
    https://jelly.jd.com/article/5fd0aaef46e72e0141248ac4
 */

import { createElement, createTextElement, render } from './main'

const Sun = Object.create(null)

Sun.createElement = createElement
Sun.createTextElement = createTextElement
Sun.render = render

export default Sun
