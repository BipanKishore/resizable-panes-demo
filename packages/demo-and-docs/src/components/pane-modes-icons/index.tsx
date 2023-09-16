import React, {useState, ReactNode} from 'react'
import {PANE_MODE} from 'react-resizable-panes'
import expand from '../../../assets/icons/expand.svg'
import compress from '../../../assets/icons/compress.svg'
import maximize from '../../../assets/icons/maximize.svg'

interface IPaneIconsProps{
    id: string,
    resizableRef:{
        current: {
            api: {
                toFullSize: any,
            closeFullSize: any,
            toFullPage: any
            }
        }
    }
}

const PaneModesIcons = (props: IPaneIconsProps) => {
  const {id, resizableRef} = props

  const [mode, setMode] = useState<string>(PANE_MODE.NORMAL)

  const onClickExpand = () => {
    resizableRef.current.api.toFullSize(id)
    setMode(PANE_MODE.FULL_SIZE)
  }

  const onClickFullPage = () => {
    resizableRef.current.api.toFullPage(id)
    setMode(PANE_MODE.FULL_PAGE)
  }

  const onClickCloseFullSize = () => {
    resizableRef.current.api.closeFullSize()
    setMode(PANE_MODE.NORMAL)
  }

  const fullSizeIcon = (
    <img
      className='m-2px-8px'
      height="auto"
      key='expand'
      src={expand}
      width={20}
      onClick={onClickExpand}
    />)

  const fullPageIcon = (
    <img
      className='m-2px-8px'
      height="auto"
      key='maximize'
      src={maximize}
      width={20}
      onClick={onClickFullPage}
    />)

  const closeFullSizeIcon = (
    <img
      className='m-2px-8px'
      height="auto"
      key='compress'
      src={compress}
      width={20}
      onClick={onClickCloseFullSize}
    />)

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
    <div className='float-right d-inline-block'>
      {contextTsx}
    </div>
  )
}

export default PaneModesIcons
