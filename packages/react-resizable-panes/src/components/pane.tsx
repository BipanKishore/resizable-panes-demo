import React, {Ref, forwardRef, useImperativeHandle, useRef} from 'react'
import {IPane} from '../@types'
import PaneIcons from './pane-icons'
import {PANE_MODE} from '../constant'
import {getSizeStyle, joinClassName, toPx} from '../utils/dom'
import {IPaneRef} from '../@types/component-types'

const Pane = (props: IPane, ref: Ref<IPaneRef>) => {
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

  useImperativeHandle(ref, (): IPaneRef => {
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

  const classname = joinClassName(
    {
      'overflow-hidden': true,
      [className]: className
    }
  )
  const style = getSizeStyle(split, size)
  return (
    <div
      className={classname}
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
