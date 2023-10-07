import React from 'react'
import {joinClassName} from '../../shared/utils'
import {ICustomResizerProp} from './type'

export const CustomResizerFirst = ({
  horizontal, onMouseDown,
  isMouseDown, onTouchStartCapture,
  name
}: ICustomResizerProp) => {
  const parentClassName = joinClassName({
    'custom-resizer-1st-parent': true,
    'h-100p w-12 flex-column': !horizontal,
    'h-12  flex-row': horizontal,
    'custom-resizer-1st-parent-hover': isMouseDown
  })

  const childClassName = joinClassName({
    'custom-resizer-1st-child f-weight-800 white': true,
    'h-70p w-100p vertical-cursur resizer-text-vertical': !horizontal,
    'w-70p h-100p horizontal-cursur': horizontal,
    'f-size-8': isMouseDown,
    'f-size-10': !isMouseDown
  })

  return (
    <div className={parentClassName}>
      <div
        className={childClassName}
        onMouseDown={onMouseDown}
        onTouchStartCapture={onTouchStartCapture}
      >
        {name}
      </div>
    </div>
  )
}
