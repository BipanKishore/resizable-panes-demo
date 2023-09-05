
import PropTypes from 'prop-types'
import React, {
  cloneElement,
  createRef, useCallback, useEffect, useMemo, useRef
} from 'react'
import Resizer from './resizer'
import useResizablePanes from '../hooks/use-resizable-panes'
import { getContainerClass, getResizableEvent } from '../utils/new-util'

import '../style.css'
import { keyConsole } from '../utils/development-util'
import { IResizablePanesProps } from '../@types/component-types'
import { noop } from '../utils/new-util'

export const ResizablePanes = (props: IResizablePanesProps) => {
  console.log('rerender')
  const {
    children, 
    resizerSize, 
    onReady = noop, 
    split,
    storage, 
    resizerNode,
    onResizeStop = noop,
    onResizeStart = noop,
    onResize = noop,
  } = props

  const isVertical = split !== 'horizontal'

  const containerRef: any = createRef()
  const panesRefs: any = useRef([])

  panesRefs.current = children.map((_, i:number) => panesRefs.current[i] ?? createRef())

  const {
    setMouseDownAndPaneAxisDetails,
    calculateAndSetHeight,
    getIdToSizeMap
  } = useResizablePanes(
    {
      children,
      containerRef,
      panesRefs,
      resizerSize: 2,
      onReady,
      isVertical,
      storage,
      onResizeStart
    }
  )

  const onMouseMove = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e, isVertical)
    keyConsole({resizableEvent: JSON.stringify(resizableEvent)})
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
    const content = []

    let i = 0
    let key
    for (;i < children.length - 1; i += 1) {
      const iCopy = i
      key = children[iCopy].props.id
      content.push(cloneElement(children[iCopy], {
        split,
        key,
        ref: panesRefs.current[iCopy]
      }))

      content.push(
        <Resizer
          key={`${key}-resizer`}
          resizerSize={resizerSize}
          node={resizerNode}
          onMouseDown={(e: any) => onMouseDown(e, iCopy)}
          split={split}
        />
      )
    }

    content.push(cloneElement(children[i], {
      split,
      key: children[i].props.id,
      ref: panesRefs.current[i]
    }))
    return content
  }, [
    children, onMouseDown, resizerSize
  ])


  const className = getContainerClass(split, isVertical)


  return (
    <div
      className={className}
      ref={containerRef}
    >
      {contentJsx}
    </div>
  )
}