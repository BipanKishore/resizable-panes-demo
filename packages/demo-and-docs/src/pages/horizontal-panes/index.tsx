import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import HORIZONTAL_PANES_MD from './horizontal-panes.md'
import MarkdownPreview from '@uiw/react-markdown-preview'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

export const HorizantalPanes = () => {
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Horizontal Panes</h3>
      </div>
      <div className='m-20-0'>
        To align panes horizontally just pass "horizontal" as split prop for ResizablePanes.
      </div>
      <ResizablePanes
        resizer={
          <CustomResizerFirst horizontal />
            } split='horizontal'
      >

        <Panes
          className={pane2} id={pane2} size={150}
        >
        </Panes>

        <Panes
          className={pane3} id={pane3} size={150}
        >
        </Panes>

      </ResizablePanes>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={HORIZONTAL_PANES_MD} />
      </div>

    </div>

  )
}
