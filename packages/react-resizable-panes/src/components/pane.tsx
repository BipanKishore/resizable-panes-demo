import React, {useRef, useContext, Fragment, useEffect} from 'react'
import {IPane} from '../@types'
import {getSizeStyle, joinClassName, toPx} from '../utils/dom'
import {ResizablePaneContext} from '../context/resizable-panes-context'
import Resizer from './resizer'

const Pane = (props: any) => {
  const paneElementRef: any = useRef<HTMLDivElement>()
  const resizerRef : any = useRef()
  const context: any = useContext(ResizablePaneContext)

  const {
    className,
    children,
    size,
    resizer
  } = props

  const setSize = (size: number) => {
    if (context.isVertical) {
      paneElementRef.current.style.width = toPx(size)
    } else {
      paneElementRef.current.style.height = toPx(size)
    }
  }
  const onCloseFullSize = () => {
    paneElementRef.current.classList.remove('full-page-class')
  }

  const onFullSize = () => {
    onCloseFullSize()
  }

  const onFullPage = () => {
    paneElementRef.current.style.removeProperty('height')
    paneElementRef.current.style.removeProperty('width')
    paneElementRef.current.classList.add('full-page-class')
  }

  useEffect(() => {
    context.registerPaneAndResizer({
      setSize,
      onFullSize,
      onFullPage,
      onCloseFullSize
    }, props, resizerRef)
  }, [])

  const classname = joinClassName({
    'overflow-hidden': true,
    [className]: className
  })

  const style = getSizeStyle(context.isVertical, size)
  return (
    <Fragment>
      <div
        className={classname}
        ref={paneElementRef}
        style={style}
      >
        {children}
      </div>

      <Resizer id={props.id} ref={resizerRef}>
        {resizer}
      </Resizer>
    </Fragment>
  )
}

export default (Pane)
