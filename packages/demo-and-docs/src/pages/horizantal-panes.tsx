import React from 'react'
import {
  Panes, ResizablePanes
} from 'react-resizable-panes'

export const HorizantalPanes = () => {
  const onReady = () => {}

  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  return (
    <ResizablePanes
      className=''
      name='name'
      resizerSize={25}
      split={'horizontal'}
      onReady={onReady}
    >

      <Panes
        className={pane1}
        id={pane1}
        key={pane1}
        maxSize={500}
        minSize={100}
        size={200}
      >
      </Panes>

      <Panes
        className={pane2}
        id={pane2}
        key={pane2}
        maxSize={500}
        minSize={100}
        size={200}
      >
      </Panes>

      <Panes
        className={pane3}
        id={pane3}
        key={pane3}
        maxSize={500}
        minSize={0}
        size={200}
      >
      </Panes>

      {/* <Panes
        className={pane2}
        id={'pane4'}
        maxSize={500}
        minSize={0}
        size={200}
      >
      </Panes> */}

    </ResizablePanes>
  )
}
