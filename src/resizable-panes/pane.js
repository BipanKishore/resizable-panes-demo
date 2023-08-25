import React, { forwardRef } from 'react'

import PropTypes from 'prop-types'

function Pane(props, ref) {
	// eslint-disable-next-line react/prop-types
	const { className, children, id } = props
	return (
		<div className={className} ref={ref} id={id}>
			{children}
		</div>
	)
}

Pane.prototypes = {
	className: PropTypes.string,
	children: PropTypes.element,
}

export default forwardRef(Pane)
