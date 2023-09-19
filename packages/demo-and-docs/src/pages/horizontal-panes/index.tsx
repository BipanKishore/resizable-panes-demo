import React from 'react'
import {
  Panes, ResizablePanes
} from 'react-resizable-panes'

export const HorizantalPanes = () => {
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  return (
    <ResizablePanes split='horizontal'>

      <Panes className={pane2} id={pane2} size={200}>
      </Panes>

      <Panes className={pane3} id={pane3} size={200}>
      </Panes>

    </ResizablePanes>
  )
}
