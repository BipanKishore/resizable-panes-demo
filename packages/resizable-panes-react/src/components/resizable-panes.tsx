import React, {
  createRef,
  useContext
} from 'react'
import '../style.css'
import {IResizablePanesProps} from '../@types'
import {getContainerClass} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'

export const ResizablePanes = (props: IResizablePanesProps) => {
  const {children, className} = props
  const context: any = useContext(ResizablePaneContext)
  const containerRef: any = createRef()

  const getContainerRect = () => {
    return containerRef.current.getBoundingClientRect()
  }

  context.register({getContainerRect})

  const classname = getContainerClass(context.isVertical, className)

  return (
    <div
      className={classname}
      ref={containerRef}
    >
      {children}
    </div>
  )
}
