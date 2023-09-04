import PropTypes from 'prop-types'
import React, {forwardRef} from 'react'
import {toPx} from '../utils/util'

export const Resizer = forwardRef((props, ref) => {
  const {
    onMouseDown, resizerSize
  } = props
  return (
    <div
      className='resizer vertical-cursur'
      ref={ref}
      style={{
        height: `${toPx(resizerSize)}`
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
