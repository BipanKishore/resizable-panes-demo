
import PropTypes from 'prop-types'
import React, {
  cloneElement,
  createRef, useCallback, useEffect, useMemo, useRef
} from 'react'
import Resizer from './resizer'
import useResizablePanes from '../hooks/use-resizable-panes'
import { getResizableEvent } from '../utils/new-util'
import { IResizablePanes } from '../@types'


export const ResizablePanes = (props: IResizablePanes) => {
  console.log('rerender')
  const {
    children, resizerSize, onReady, split
  } = props

  const containerRef: any = createRef()
  const panesRefs: any = useRef([])

  panesRefs.current = children.map((_, i:number) => panesRefs.current[i] ?? createRef())

  const {
    setMouseDownAndPaneAxisDetails,
    calculateAndSetHeight
  } = useResizablePanes(
    {
      children,
      containerRef,
      panesRefs,
      resizerSize,
      onReady
    }
  )

  const onMouseMove = useCallback((e: any) => {
    const resizableEvent = getResizableEvent(e)
    calculateAndSetHeight(resizableEvent)
  }, [])

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    return () => document.removeEventListener('mouseup', onMouseUp)
  }, [onMouseUp])

  const onMouseDown = useCallback((e: any, index: number) => {
    const resizableEvent = getResizableEvent(e)
    setMouseDownAndPaneAxisDetails(resizableEvent, index)
    document.addEventListener('mousemove', onMouseMove)
  }, [
    setMouseDownAndPaneAxisDetails,
    onMouseMove
  ])

  const contentJsx = useMemo(() => {
    const content = []

    let i = 0
    let key
    for (;i < children.length - 1; i += 1) {
      const iCopy = i
      key = children[iCopy].props.id
      content.push(cloneElement(children[iCopy], {
        key,
        ref: panesRefs.current[iCopy]
      }))

      content.push(
        <Resizer
          key={`${key}-resizer`}
          resizerSize={resizerSize}
          onMouseDown={(e: any) => onMouseDown(e, iCopy)}
        />
      )
    }

    content.push(cloneElement(children[i], {
      key: children[i].props.id,
      ref: panesRefs.current[i]
    }))
    return content
  }, [
    children, onMouseDown, resizerSize
  ])

  return (
    <div
      className='pane-container bg-lightblue'
      ref={containerRef}
    >
      {contentJsx}
    </div>
  )
}