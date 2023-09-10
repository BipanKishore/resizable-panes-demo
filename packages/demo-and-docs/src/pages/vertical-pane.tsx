import React from 'react'
import {
  Panes, ResizablePanes
} from 'react-resizable-panes'

export const VerticalPanes = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  console.log('are we here')
  return (
    <ResizablePanes
      className='h-300'
      split='vertical'
    >

      <Panes
        className={pane1}
        id={pane1}
        key={pane1}
        size={350}
      >
      </Panes>

      <Panes
        className={pane2}
        id={pane2}
        key={pane2}
        size={300}
      >
      </Panes>

      <Panes
        className={pane3}
        id={pane3}
        key={pane3}
        size={200}
      >
      </Panes>

    </ResizablePanes>
  )
}
