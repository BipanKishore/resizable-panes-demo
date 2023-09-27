import React from 'react'
import {joinClassName} from '../../shared/utils'

export const CustomResizerFirst = ({horizontal}: {
  horizontal?: boolean
}) => {
  const parentClassName = joinClassName({
    'custom-resizer-1st-parent': true,
    'h-100p w-12 vertical-cursur flex-column': !horizontal,
    'h-12 horizontal-cursur flex-row': horizontal
  })

  const childClassName = joinClassName({
    'custom-resizer-1st-child': true,
    'h-70p w-100p': !horizontal,
    'w-70p h-100p': horizontal
  })

  return (
    <div className={parentClassName}>
      <div className={childClassName}></div>
    </div>
  )
}
