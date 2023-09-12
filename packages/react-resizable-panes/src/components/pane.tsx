import React, {forwardRef, useImperativeHandle, useRef} from 'react'
import {IPane} from '../@types'
import PaneIcons from './pane-icons'
import {PANE_MODE} from '../constant'
import {getSizeStyle, toPx} from '../utils/dom'

const Pane = (props: IPane, ref: any) => {
  const paneIconRef: any = useRef()
  const paneElementRef: any = useRef<HTMLDivElement>()

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
    const paneElement = paneElementRef.current

    return {
      setSize: (size: number) => {
        if (isVertical) {
          paneElement.style.width = toPx(size)
        } else {
          paneElement.style.height = toPx(size)
        }
      },
      onFullSize: () => {
        setModeAct(PANE_MODE.FULL_SIZE)
        paneElement.classList.remove('full-page-class')
      },
      onFullPage: () => {
        setModeAct(PANE_MODE.FULL_PAGE)
        paneElement.style.removeProperty('height')
        paneElement.style.removeProperty('width')
        paneElement.classList.add('full-page-class')
      },
      onCloseFullSize: () => {
        paneElement.classList.remove('full-page-class')
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
