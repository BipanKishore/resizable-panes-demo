import React from 'react'
import {joinClassName} from '../../shared/utils'

export const CustomResizerSecond = ({horizontal}: {
  horizontal?: boolean
}) => {
  const parentClassName = joinClassName({
    'custom-resizer-2st-parent': true,
    'h-100p': !horizontal,
    '': horizontal
  })

  const childClassName = joinClassName({
    'custom-resizer-2st-child': true,
    'h-100p w-8': !horizontal,
    '.w-100p h-8': horizontal
  })
  return (
    <div
      className={parentClassName}
    >
      <div className={childClassName} ></div>

    </div>
  )
}
