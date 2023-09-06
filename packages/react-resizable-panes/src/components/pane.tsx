import React, {
  forwardRef, useMemo
} from 'react'
import {getSizeStyle} from '../utils/new-util'
import {IPane} from '../@types/component-types'

function Pane (props: IPane, ref: any) {
  const {
    className,
    children,
    size,
    split
  } = props

  const style = useMemo(
    () => getSizeStyle(split, size),
    [split, size])

  return (
    <div
      className={className}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  )
}

export default forwardRef(Pane)
