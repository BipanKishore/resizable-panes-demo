import PropTypes, { node } from 'prop-types'
import React, {MouseEventHandler, forwardRef, useMemo} from 'react'
import {toPx} from '../utils/util'
import { getSizeStyle } from '../utils/new-util'
import { SplitType } from '../@types'

interface IResizer {
  onMouseDown: MouseEventHandler<HTMLDivElement>,
  resizerSize: number,
  split: SplitType,
  node: any
}

 const Resizer = (props: IResizer, ref: any) => {
  const {
    onMouseDown, resizerSize, split, node: Node
  } = props

  const style = useMemo(() => getSizeStyle(split, resizerSize), [split, resizerSize])


  return (
    <div
      className='resizer vertical-cursur'
      ref={ref}
      style={style}
      onMouseDown={onMouseDown}
    ><Node className='d-block m-auto' /></div>
  )
}

export default forwardRef(Resizer)