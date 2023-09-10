import React, {
  RefObject,
  cloneElement,
  createRef, memo, useCallback, useEffect, useMemo, useRef
} from 'react'
import Resizer from './resizer'
import useResizablePanes from '../hooks/use-resizable-panes'
import {getContainerClass, getResizableEvent, noop} from '../utils/new-util'

import '../style.css'
import {IResizablePanesProps} from '../@types/component-types'

export const ResizablePanes = memo((props: IResizablePanesProps) => {
  console.log('rerender -> ResizablePanes')
  const {
    children,
    onReady = noop,
    split,
    storage,
    resizerNode,
    onResizeStop = noop,
    onResizeStart = noop,
    onResize = noop,
    className
  } = props

  const isVertical = split !== 'horizontal'

  const containerRef: any = createRef()
  const panesRefs: any = useRef<RefObject<HTMLDivElement>[]>([])
  const resizerRefs: any = useRef([])

  resizerRefs.current = children.map((_, i:number) => resizerRefs.current[i] ?? createRef())
  panesRefs.current = children.map((_, i:number) => panesRefs.current[i] ?? createRef())

  const {
    setMouseDownAndPaneAxisDetails,
    calculateAndSetHeight,
    getIdToSizeMap
    // resizerVisibilityList
  } = useResizablePanes(
    {
      children,
      containerRef,
      panesRefs,
      resizerRefs,
      resizerSize: 2,
      onReady,
      isVertical,
      storage,
      onResizeStart
    }
  )

  const onMouseMove = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e, isVertical)
    calculateAndSetHeight(resizableEvent)
    const resizeParams = getIdToSizeMap()
    onResize(resizeParams)
  }, [isVertical, onResize])

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
    const resizeParams = getIdToSizeMap()
    onResizeStop(resizeParams)
  }, [onMouseMove])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    return () => document.removeEventListener('mouseup', onMouseUp)
  }, [onMouseUp])

  const onMouseDown = useCallback((e: any, index: number) => {
    const resizableEvent = getResizableEvent(e, isVertical)
    setMouseDownAndPaneAxisDetails(resizableEvent, index)
    document.addEventListener('mousemove', onMouseMove)
  }, [
    setMouseDownAndPaneAxisDetails,
    onMouseMove,
    isVertical
  ])

  const contentJsx = useMemo(() => {
    console.log('rerender -> contentJsx')
    const content = []

    let i = 0
    let key
    for (;i < children.length - 1; i += 1) {
      const iCopy = i
      key = children[iCopy].props.id
      content.push(cloneElement(children[iCopy], {
        split,
        key,
        innerRef: panesRefs.current[iCopy]
      }))

      content.push(
        <Resizer
          key={`${key}-resizer`}
          node={resizerNode}
          ref={resizerRefs.current[iCopy]}
          split={split}
          onMouseDown={(e: any) => onMouseDown(e, iCopy)}
        />
      )
    }

    content.push(cloneElement(children[i], {
      split,
      key: children[i].props.id,
      innerRef: panesRefs?.current[i]
    }))
    return content
  }, [
    children, onMouseDown
  ])

  const classname = getContainerClass(split, isVertical, className)

  return (
    <div
      className={classname}
      ref={containerRef}
    >
      {contentJsx}
    </div>
  )
}, () => false)
