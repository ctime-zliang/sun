/* 
	https://jelly.jd.com/article/60aceb6b27393b0169c85231
	https://pomb.us/build-your-own-react/
 */

import Sun from '@/'
import { View } from './component/view'

const Index = (props) => {
	return (
		<div style="color: red;">
			<span>{props.id}</span>
			<View />
		</div>
	)
}

Sun.render(<Index id={123456789}/>, document.querySelector(`#app`))