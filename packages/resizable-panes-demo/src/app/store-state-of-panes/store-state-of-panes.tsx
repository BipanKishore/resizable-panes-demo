"use client"
import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'


const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
     localStorage
  }
}

const StoreStateOfPanes = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'


  return (
    <ResizablePanes
      storageApi={getLocalStorage()}
      uniqueId="panes-size"
      unit="ratio"
      vertical
    >
      <Panes className={pane1} id={pane1} minSize={1} size={3}>
      </Panes>

      <Panes className={pane2} id={pane2} minSize={1} size={4}>
      </Panes>

      <Panes className={pane3} id={pane3} minSize={1} size={3}>
      </Panes>
    </ResizablePanes>
  )
}

export default StoreStateOfPanes