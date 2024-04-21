"use client"
import { EVEN_PANE_CLASS, ODD_PANE_CLASS } from '@/shared/constant'
import { getLocalStorage } from '@/shared/utils'
import React from 'react'
import {
  Pane, ResizablePanes
} from 'resizable-panes-react'

const StoreStateOfPanes = () => {
  return (
    <ResizablePanes
      storageApi={getLocalStorage()}
      uniqueId="store-eg"
      unit="ratio"
      vertical
    >
      <Pane className={ODD_PANE_CLASS} id='P0' minSize={1} size={3}>
      </Pane>

      <Pane className={EVEN_PANE_CLASS} id='P1' minSize={1} size={4}
      >
      </Pane>

      <Pane className={ODD_PANE_CLASS} id='P2' minSize={1} size={3}>
      </Pane>
    </ResizablePanes>
  )
}

export default StoreStateOfPanes