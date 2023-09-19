import React, {
  MouseEventHandler, forwardRef, useRef, useState,
  useContext, useCallback, useEffect, useImperativeHandle
} from 'react'
import {SplitType} from '../@types'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import {getResizableEvent, joinClassName} from '../utils/dom'
import {findIndexById} from '../utils/panes'

interface IResizer {
  onMouseDown?: MouseEventHandler<HTMLDivElement>,
  split?: SplitType,
  node?: any,
  visibility?: boolean,
  children?: any[]
}

const Resizer = (props: any, ref: any) => {
  const {
    children,
    id
  } = props

  const context: any = useContext(ResizablePaneContext)
  const {isVertical, getIdToSizeMap} = context
  const ResizablePanesChildren: any = context.props.children
  const index = findIndexById(ResizablePanesChildren, id)
  const isNotLastIndex = index < (ResizablePanesChildren.length - 1)

  const resizerRref = useRef<any>()
  const [isVisibile, setIsVisibility] = useState(true)

  const setVisibility = (visibility: boolean) => {
    setIsVisibility(visibility)
  }

  const getSize = () => {
    if (!isVisibile) {
      return 0
    }
    if (children) {
      const {height, width} = resizerRref.current.getBoundingClientRect()
      return isVertical ? width : height
    }
    return 2
  }

  const onMouseMove = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e, isVertical)
    context.calculateAndSetHeight(resizableEvent)
    const resizeParams = getIdToSizeMap()
    context.props.onResize(resizeParams)
  }, [isVertical, getIdToSizeMap, context])

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
    const resizeParams = getIdToSizeMap()
    context.props.onResizeStop(resizeParams)
  }, [onMouseMove, context, getIdToSizeMap])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    return () => document.removeEventListener('mouseup', onMouseUp)
  }, [onMouseUp])

  const onMouseDown = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e, isVertical)
    context.setMouseDownAndPaneAxisDetails(resizableEvent, id)
    document.addEventListener('mousemove', onMouseMove)
  }, [
    context,
    onMouseMove,
    isVertical,
    id
  ])

  useImperativeHandle(ref, () => ({
    setVisibility,
    getSize
  }))

  const className = joinClassName({
    resizer: true,
    'resizer-horizontal': isVertical,
    'resizer-vertical': !isVertical
  }, children)

  if (isVisibile && isNotLastIndex) {
    return (
      <div
        className={className}
        ref={resizerRref}
        onMouseDown={onMouseDown}
      >
        {children}
      </div>
    )
  }
}

export default forwardRef(Resizer)
