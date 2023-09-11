import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import {getSizeStyle} from '../utils/new-util'
import {IPane} from '../@types/component-types'
import PaneIcons from './pane-icons'
import {toPx} from '../utils/util'
import {PANE_MODE} from '../constant'

const Pane = (props: IPane, ref: any) => {
  const paneIconRef: any = useRef()
  const paneElementRef: any = useRef()

  const {
    className,
    children,
    size,
    split,
    id,
    toFullSize,
    closeFullSize,
    toFullPage,
    isVertical
  } = props

  useImperativeHandle(ref, () => {
    const {setModeAct} = paneIconRef.current

    return {
      setSize: (size: number) => {
        if (isVertical) {
          paneElementRef.current.style.width = toPx(size)
        } else {
          paneElementRef.current.style.height = toPx(size)
        }
      },
      removeSize: () => {
        paneElementRef.current.style.removeProperty('height')
        paneElementRef.current.style.removeProperty('width')
      },
      onFullSize: () => {
        setModeAct(PANE_MODE.FULL_SIZE)
      },
      onFullPage: () => {
        setModeAct(PANE_MODE.FULL_PAGE)
        paneElementRef.current.classList.add('full-page-class')
      },
      onCloseFullSize: () => {
        setModeAct(PANE_MODE.NORMAL)
      }
    }
  })

  const style = getSizeStyle(split, size)
  return (
    <div
      className={className}
      ref={paneElementRef}
      style={style}
    >
      <PaneIcons
        closeFullSize={closeFullSize}
        id={id}
        ref={paneIconRef}
        toFullPage={toFullPage}
        toFullSize={toFullSize}
      />
      {children}
    </div>
  )
}

export default forwardRef(Pane)
