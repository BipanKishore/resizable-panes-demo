import React, { forwardRef } from 'react'

import PropTypes from 'prop-types'

function Pane(props, ref) {
	// eslint-disable-next-line react/prop-types
	const { className, children } = props
	return (
		<div className={className} ref={ref}>
			{children}
		</div>
	)
}

Pane.prototypes = {
	className: PropTypes.string,
	children: PropTypes.element,
}

export default forwardRef(Pane)
