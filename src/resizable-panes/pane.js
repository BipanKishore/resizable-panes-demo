import PropTypes from 'prop-types'
import React, {forwardRef} from 'react'

import {toPx} from './util'

function Pane (props, ref) {

	const {
// eslint-disable-next-line react/prop-types
className, children, id, size
} = props
	return (
		<div className={className} ref={ref} id={id} style={{
			height: toPx(size)
		}}>
			{children}
		</div>
	)
}

Pane.prototypes = {
	children: PropTypes.element,
	className: PropTypes.string,
	id: PropTypes.string.isRequired
}

export default forwardRef(Pane)
