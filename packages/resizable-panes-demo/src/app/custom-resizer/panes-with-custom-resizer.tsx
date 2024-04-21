"use client"

import React from 'react'
import {
  Pane, ResizablePanes
} from 'resizable-panes-react'
import { CustomResizerFirst } from '../../components/custom-resizers/custom-resizer-first'
import { CustomResizerSecond } from '../../components/custom-resizers/custom-resizer-second'
import { EVEN_PANE_CLASS, ODD_PANE_CLASS } from '@/shared/constant'

const PanesWithCustomResizer = () => {

  return (
    <ResizablePanes
      resizer={
        <CustomResizerFirst name='' />
      }
      uniqueId='CustomResizerPanes1'
      unit="ratio"
      vertical
    >
      <Pane className={ODD_PANE_CLASS} id='P0' minSize={5} size={30}></Pane>
      <Pane className={EVEN_PANE_CLASS} id='P1'
        minSize={5}
        resizer={
          <CustomResizerSecond name='Second' />
        }
        size={40}
      > </Pane>
      <Pane className={ODD_PANE_CLASS} id='P2' minSize={5} size={30}></Pane>
    </ResizablePanes>
  )
}

export default PanesWithCustomResizer