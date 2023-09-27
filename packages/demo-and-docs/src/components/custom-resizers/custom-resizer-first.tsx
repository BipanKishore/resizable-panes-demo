import React from 'react'
import resize_tool_horizontal from '../../../assets/icons/resize_tool_horizontal.svg'
import { joinClassName } from '../../shared/utils'

export const CustomResizerFirst = ({ horizontal }: {
  horizontal?: boolean
}) => {
  const parentClassName = joinClassName({
    'custom-resizer-1st-parent': true,
    'h-100p w-12 vertical-cursur': !horizontal,
    'h-12 horizontal-cursur': horizontal
  })

  const childClassName = joinClassName({
    'custom-resizer-1st-child': true,
    'h-70p w-100p': true
  })

  return (
    <div className={parentClassName}>
      <div className={childClassName}></div>
    </div>
  )
}
