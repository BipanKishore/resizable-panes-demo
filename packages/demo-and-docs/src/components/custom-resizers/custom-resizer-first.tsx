import React from 'react'
import {joinClassName} from '../../shared/utils'
import {ICustomResizerProp} from './type'

export const CustomResizerFirst = ({
  horizontal, onMouseDown,
  isMouseDown, onTouchStartCapture,
  name, size
}: ICustomResizerProp) => {
  const parentClassName = joinClassName({
    'custom-resizer-1st-parent': true,
    'h-100p flex-column': !horizontal,
    'flex-row': horizontal,
    'custom-resizer-1st-parent-hover': isMouseDown,
    'h-12': !size && horizontal,
    'w-12': !size && !horizontal
  })

  const childClassName = joinClassName({
    'custom-resizer-1st-child f-weight-800 white': true,
    'h-70p w-100p vertical-cursur resizer-text-vertical': !horizontal,
    'w-70p h-100p horizontal-cursur': horizontal,
    'f-size-8': isMouseDown,
    'f-size-10': !isMouseDown
  })

  const parentStyle: any = {}

  if (size) {
    if (horizontal) {
      parentStyle.height = `${size}px`
    } else {
      parentStyle.width = `${size}px`
    }
  }

  return (
    <div
      className={parentClassName}
      style={parentStyle}
    >
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
