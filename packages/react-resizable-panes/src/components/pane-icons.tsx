import React, {Fragment, forwardRef, useCallback, useImperativeHandle, useState, ReactNode} from 'react'
import {Svg} from './svg'
import {PANE_MODE} from '../constant'

interface IPaneIconsProps{
    id: string,
    toFullSize: any,
    closeFullSize: any,
    toFullPage: any
}

const PaneIcons = (props: IPaneIconsProps, ref: any) => {
  const {toFullSize, closeFullSize, toFullPage, id} = props

  const [mode, setMode] = useState<string>(PANE_MODE.NORMAL)

  const onClickExpand = useCallback(() => toFullSize(id),
    [toFullSize, id])

  const onClickFullPage = useCallback(() => toFullPage(id),
    [toFullPage, id])

  const onClickCloseFullSize = useCallback(() => closeFullSize(),
    [closeFullSize])

  useImperativeHandle(ref, () => {
    return {
      setModeAct: (mode: string) => {
        setMode(mode)
      }
    }
  })

  const fullSizeIcon = <Svg key={'expand'} name='Expand' onClick={onClickExpand} />
  const fullPageIcon = <Svg key={'fullpage'} name='FullPage' onClick={onClickFullPage} />
  const closeFullSizeIcon = <Svg key={'compress'} name='compress' onClick={onClickCloseFullSize} />

  let contextTsx: ReactNode[] = []
  switch (mode) {
    case PANE_MODE.NORMAL:
      contextTsx = [fullSizeIcon, fullPageIcon]
      break
    case PANE_MODE.FULL_SIZE:
      contextTsx = [fullPageIcon, closeFullSizeIcon]
      break
    case PANE_MODE.FULL_PAGE:
      contextTsx = [fullSizeIcon, closeFullSizeIcon]
      break
  }

  return (
    <Fragment>
      {contextTsx}
    </Fragment>
  )
}

export default forwardRef(PaneIcons)
