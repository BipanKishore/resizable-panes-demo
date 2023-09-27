import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import CUSTOM_RESIZER_MD from './custom-resizer.md'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'
import {CustomResizerSecond} from '../../components/custom-resizers/custom-resizer-second'

export const CustomResizer = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Custom Resizer for Panes</h3>
      </div>

      <div className='m-20-0'>
        To align panes vertical just pass "vertical" as split prop for ResizablePanes.
      </div>
      <div className='m-20-0' >
        <ResizablePanes
          className='h-300' resizer={
            <CustomResizerFirst />
            }
          vertical
        >
          <Panes
            className={pane1} id={pane1}
            size={350}
          >
          </Panes>

          <Panes
            className={pane2} id={pane2}
            resizer={
              <CustomResizerSecond />
            }
            size={300}
          >
          </Panes>

          <Panes className={pane3} id={pane3} size={150}>
          </Panes>

        </ResizablePanes>
      </div>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={CUSTOM_RESIZER_MD} />
      </div>
    </div>
  )
}
