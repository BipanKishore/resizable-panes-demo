import React, {Fragment, useState} from 'react'
import {Svg} from './svg'

interface IPaneIconsProps{
    id: string,
    toFullSize: any,
    closeFullSize: any,
    toFullPage: any
}

export const PaneIcons = (props: IPaneIconsProps) => {
  const {toFullSize, closeFullSize, toFullPage, id} = props

  const [state, setState] = useState()

  return (
    <Fragment>
      <Svg name='Expand' onClick={() => toFullSize(id)} />
      <Svg name='FullPage' onClick={() => toFullPage(id)} />
      <Svg name='compress' onClick={() => closeFullSize()} />
    </Fragment>
  )
}
