import React, {MouseEventHandler, forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {SplitType} from '../@types'
import {toPx} from '../utils/util'

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
    split
  } = props

  const resizerRref = useRef<any>()
  const [isVisibility, setIsVisibility] = useState(true)
  const isVertical = split === 'vertical'

  useImperativeHandle(ref, () => {
    return {
      setVisibility: (visibility: boolean) => {
        setIsVisibility(visibility)
      },
      getRect: () => resizerRref.current.getBoundingClientRect()
    }
  })

  if (isVisibility) {
    const className = isVertical ? 'resizer-horizontal' : 'resizer-vertical'
    return (
      <div
        className={`resizer ${className}`}
        ref={resizerRref}
        onMouseDown={onMouseDown}
      >
      </div>
    )
  }
}

export default forwardRef(Resizer)
