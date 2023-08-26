import PropTypes from 'prop-types'
import React, {forwardRef} from 'react'

export const Resizer = forwardRef((props, ref) => {
    const {
        onMouseDown, resizerSize
    } = props
    return (
        <div
            style={{
                height: `${resizerSize}px`
            }}
            className='resizer vertical-cursur'
            onMouseDown={onMouseDown}
            ref={ref}
        />
    )
})

Resizer.displayName = 'Resizer'

Resizer.propTypes = {
    onMouseDown: PropTypes.func.isRequired,
    resizerSize: PropTypes.number.isRequired
}
