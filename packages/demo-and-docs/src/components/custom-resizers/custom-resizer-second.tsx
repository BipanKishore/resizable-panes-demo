import React from 'react'
import {joinClassName} from '../../shared/utils'

export const CustomResizerSecond = ({horizontal, onMouseDown, isMouseDown}: {
  horizontal?: boolean,
  onMouseDown?:any,
  isMouseDown?: boolean
}) => {
  const parentClassName = joinClassName({
    'custom-resizer-2st-parent': true,
    'h-100p w-12 flex-column': !horizontal,
    'h-12  flex-row': horizontal,
    'custom-resizer-2st-parent-hover': isMouseDown
  })

  const childClassName = joinClassName({
    'custom-resizer-2st-child': true,
    'h-70p w-100p vertical-cursur': !horizontal,
    'w-70p h-100p horizontal-cursur': horizontal
  })

  return (
    <div className={parentClassName}>
      <div className={childClassName} onMouseDown={onMouseDown}></div>
    </div>
  )
}
