import React from 'react'
import {joinClassName} from '../../shared/utils'
import {ICustomResizerProp} from './type'

export const CustomResizerFirst = ({
  horizontal, onMouseDown,
  isMouseDown, onTouchStartCapture
}: ICustomResizerProp) => {
  const parentClassName = joinClassName({
    'custom-resizer-1st-parent': true,
    'h-100p w-12 flex-column': !horizontal,
    'h-12  flex-row': horizontal,
    'custom-resizer-1st-parent-hover': isMouseDown
  })

  const childClassName = joinClassName({
    'custom-resizer-1st-child': true,
    'h-70p w-100p vertical-cursur': !horizontal,
    'w-70p h-100p horizontal-cursur': horizontal
  })

  return (
    <div className={parentClassName}>
      <div
        className={childClassName}
        onMouseDown={onMouseDown}
        onTouchStartCapture={onTouchStartCapture}
      >
      </div>
    </div>
  )
}
