import React, {
  RefObject,
  cloneElement,
  createRef, memo, useCallback, useEffect, useMemo, useRef
} from 'react'
import Resizer from './resizer'
import useResizablePanes from '../hooks/use-resizable-panes'

import '../style.css'
import {IResizablePanesProps} from '../@types'
import {noop} from '../utils/util'
import {getContainerClass, getResizableEvent} from '../utils/dom'
import {IPaneRef} from '../@types/component-types'

export const ResizablePanes = memo((props: IResizablePanesProps) => {
  console.log('rerender -> ResizablePanes')
  const {
    children,
    onReady = noop,
    split,
    resizerNode,
    onResizeStop = noop,
    onResizeStart = noop,
    onResize = noop,
    className,
    onChangeVisibility
  } = props

  const isVertical = split !== 'horizontal'

  const containerRef: any = createRef()
  const panesRefs: any = useRef<RefObject<HTMLDivElement>[]>([])
  const resizerRefs: any = useRef([])

  resizerRefs.current = children.map((_, i:number) => resizerRefs.current[i] ?? createRef())
  panesRefs.current = children.map((_, i:number) => panesRefs.current[i] ?? createRef() as RefObject<IPaneRef>)
  const {
    setMouseDownAndPaneAxisDetails,
    calculateAndSetHeight,
    getIdToSizeMap,
    toFullSize,
    closeFullSize,
    toFullPage
  } = useResizablePanes(
    {
      children,
      containerRef,
      panesRefs,
      resizerRefs,
      resizerSize: 2,
      onReady,
      isVertical,
      onResizeStart,
      onChangeVisibility
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
        isVertical,
        split,
        key,
        ref: panesRefs.current[iCopy],
        toFullSize,
        closeFullSize,
        toFullPage
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
      isVertical,
      split,
      key: children[i].props.id,
      ref: panesRefs?.current[i],
      toFullSize,
      closeFullSize,
      toFullPage
    }))
    return content
  }, [
    children, onMouseDown
  ])

  const classname = getContainerClass(isVertical, className)

  return (
    <div
      className={classname}
      ref={containerRef}
    >
      {contentJsx}
    </div>
  )
}, () => false)
