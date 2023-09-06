import React, {MouseEventHandler, forwardRef} from 'react'
import {SplitType} from '../@types'

interface IResizer {
  onMouseDown: MouseEventHandler<HTMLDivElement>,
  resizerSize?: number,
  split: SplitType,
  node?: any,
  visibility?: boolean
}

const Resizer = (props: IResizer, ref: any) => {
  const {
    onMouseDown,
    split,
    visibility
  } = props

  const className = split === 'vertical' ? 'resizer-vertical' : 'resizer-horizontal'

  // Only hiding for the case of false
  if (visibility === false) {
    return null
  }

  return (
    <div
      className={`resizer ${className}`}
      ref={ref}
      onMouseDown={onMouseDown}
    >
    </div>
  )
}

export default forwardRef(Resizer)
