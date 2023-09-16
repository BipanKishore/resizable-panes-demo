import React, {MouseEventHandler, forwardRef, useImperativeHandle, useRef, useState} from 'react'
import {SplitType} from '../@types'

interface IResizer {
  onMouseDown: MouseEventHandler<HTMLDivElement>,
  split: SplitType,
  node?: any,
  visibility?: boolean,
  children?: any[]
}

const Resizer = (props: IResizer, ref: any) => {
  const {
    onMouseDown,
    split,
    children
  } = props

  const resizerRref = useRef<any>()
  const [isVisibility, setIsVisibility] = useState(true)
  const isVertical = split === 'vertical'

  useImperativeHandle(ref, () => {
    return {
      setVisibility: (visibility: boolean) => {
        setIsVisibility(visibility)
      },
      getRect: () => resizerRref.current.getBoundingClientRect(),
      getSize: () => {
        const {height, width, top, bottom} = resizerRref.current.getBoundingClientRect()
        // keyConsole({height, width, top, bottom})
        if (isVisibility) {
          return 0
        } else if (!children) {
          return 2
        } else if (isVertical) {
          return width
        } else {
          return height
        }
      }
    }
  })

  if (isVisibility) {
    const className = isVertical ? 'resizer-horizontal' : 'resizer-vertical'
    return (
      <div
        className={`resizer ${className}`}
        draggable="false"
        ref={resizerRref}
        onMouseDown={onMouseDown}
      >
      </div>
    )
  }
}

export default forwardRef(Resizer)
