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
        The ResizablePanes has an event onReady. OnReady provides an api as param. It has has
        following methods to change the view of panes:

        <ul>
          <li>toFullSize: pass param as paneId</li>
          <li>toFullPage: pass param as paneId</li>
          <li>closeFullSize</li>
        </ul>

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
          className={pane1} id={pane1} size={200}
        >
          <PaneModesIcons id={pane1} resizableRef={resizableRef} />
        </Panes>

        <Panes className={pane2} id={pane2} size={200}>
          <PaneModesIcons id={pane2} resizableRef={resizableRef} />
        </Panes>
      </ResizablePanes>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={FULL_SCREEN_MODE} />
      </div>

    </div>
  )
}
