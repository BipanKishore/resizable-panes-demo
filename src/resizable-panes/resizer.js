import PropTypes from 'prop-types'
import React, {forwardRef} from 'react'

export const Resizer = forwardRef((props, ref) => {
  const {
    onMouseDown, resizerSize
  } = props
  return (
    <div
      className='resizer vertical-cursur'
      ref={ref}
      style={{
        height: `${resizerSize}px`
      }}
      onMouseDown={onMouseDown}
    />
  )
})

Resizer.displayName = 'Resizer'

Resizer.propTypes = {
  resizerSize: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired
}
