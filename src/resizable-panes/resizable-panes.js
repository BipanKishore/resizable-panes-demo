import React, {
  cloneElement,
    createRef, useCallback, useEffect, useMemo, useRef,
} from 'react'
import './style.css'
import PropTypes from 'prop-types'
import panesService from './pane-service'
import { Resizer } from './resizer'

export const ResizablePanes = (props) => {
  console.log('rerender')
  const { children, resizerSize } = props

  const containerRef = createRef()
  const panesRefs = useRef([])
  panesRefs.current = children.map((_element, i) => panesRefs.current[i] ?? createRef())

  useEffect(() => {
    panesService.initPanesService(containerRef, panesRefs, resizerSize)
  }, [])

  const onMouseMove = useCallback((e) => {
    panesService.calculateAndSetHeight(e)
  }, [])

  const onMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    return () => document.removeEventListener('mouseup', onMouseUp)
  }, [])

  const onMouseDown = useCallback((e, index) => {
    console.log(index)
    panesService.setMouseDownAndPaneAxisDetails(e)
    panesService.setActiveIndex(index)
    document.addEventListener('mousemove', onMouseMove)
  }, [])

  const onMouseLeave = useCallback(() => {
  }, [])

  const onMouseEnter = useCallback(() => {
  }, [])

  const contentJsx = useMemo(() => {
    const content = []
    // eslint-disable-next-line no-var
    let i = 0
    let key
    for ( ;i < children.length - 1; i += 1) {
      const iCopy = i;
       key = children[iCopy].props.id
      content.push(cloneElement(children[iCopy], {
        key,
        ref: panesRefs.current[iCopy],
      }))
      
      content.push(
        <Resizer
          key={`${key}-resizer`}
          resizerSize={resizerSize}
          onMouseDown={(e) => onMouseDown(e, iCopy)}
        />,
      )
    }

    content.push(cloneElement(children[i], {
      key: children[i].props.id,
      ref: panesRefs.current[i],
    }))
    return content
  }, children)

  return (
    <div
      className="pane-container bg-lightblue"
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {contentJsx}
    </div>
  )
}

ResizablePanes.propTypes = {

  children: PropTypes.any.isRequired,
  resizerSize: PropTypes.number.isRequired,
}
