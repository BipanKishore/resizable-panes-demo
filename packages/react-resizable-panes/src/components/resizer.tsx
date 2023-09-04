import PropTypes from 'prop-types'
import React, {MouseEventHandler, forwardRef} from 'react'
import {toPx} from '../utils/util'

interface IResizer {
  onMouseDown: MouseEventHandler<HTMLDivElement>,
  resizerSize: number
}

 const Resizer = (props: IResizer, ref: any) => {
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
}

export default forwardRef(Resizer)