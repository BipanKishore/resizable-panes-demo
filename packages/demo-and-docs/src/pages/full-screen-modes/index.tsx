import React, {useRef} from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import PaneModesIcons from '../../components/pane-modes-icons'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'
import FULL_SCREEN_MODE from './full-screen-mode.md'

export const FullScreenModes = () => {
  const resizableRef = useRef<any>({})
  const pane1 = 'pane1'
  const pane2 = 'pane2'

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Fullscreen modes</h3>
      </div>
      <div className='m-20-0'>
        <p>The panes have the capability to expand to full screen or to the maximum
          size of the <code>ResizablePanes</code> through the <code>ResizablePanes</code> API.
        </p>
      </div>

      <ResizablePanes
        resizer={
          <CustomResizerFirst horizontal />
          }
        onReady={(api: any) => {
          resizableRef.current.api = api
        }}
      >
        <Panes
          className={pane1} id={pane1} minSize={100} size={200}
        >
          <PaneModesIcons id={pane1} resizableRef={resizableRef} />
        </Panes>

        <Panes className={pane2} id={pane2} minSize={100} size={200}>
          <PaneModesIcons id={pane2} resizableRef={resizableRef} />
        </Panes>
      </ResizablePanes>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={FULL_SCREEN_MODE} />
      </div>

    </div>
  )
}
