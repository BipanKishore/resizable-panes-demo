import React, {useRef} from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import PaneModesIcons from '../../components/pane-modes-icons'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

export const FullScreenModes = () => {
  const resizableRef = useRef<any>({})
  const pane1 = 'pane1'
  const pane2 = 'pane2'

  return (
    <ResizablePanes
      resizer={
        <CustomResizerFirst horizontal />
          }
      onReady={(api: any) => {
        resizableRef.current.api = api
      }}
    >
      <Panes
        className={pane1} id={pane1} size={200}
      >
        <PaneModesIcons id={pane1} resizableRef={resizableRef} />
      </Panes>

      <Panes className={pane2} id={pane2} size={200}>
        <PaneModesIcons id={pane2} resizableRef={resizableRef} />
      </Panes>
    </ResizablePanes>
  )
}
