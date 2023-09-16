import React, {useRef} from 'react'
import {
  Panes, ResizablePanes
} from 'react-resizable-panes'
import PaneModesIcons from '../../components/pane-modes-icons'

export const FullScreenModes = () => {
  const resizableRef = useRef<any>({})
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  return (
    <ResizablePanes
      className=''
      split='horizontal'
      onReady={(api) => {
        resizableRef.current.api = api
      }}
    >
      <Panes
        className={pane1}
        id={pane1}
        key={pane1}
        size={200}
      >
        <PaneModesIcons id={pane1} resizableRef={resizableRef} />
      </Panes>

      <Panes
        className={pane2}
        id={pane2}
        key={pane2}
        size={200}
      >
        <PaneModesIcons id={pane2} resizableRef={resizableRef} />
      </Panes>

      <Panes
        className={pane3}
        id={pane3}
        key={pane3}
        size={200}
      >
        <PaneModesIcons id={pane3} resizableRef={resizableRef} />
      </Panes>

    </ResizablePanes>
  )
}
