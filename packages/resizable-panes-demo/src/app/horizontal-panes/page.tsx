"use client"
import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import HORIZONTAL_PANES_MD from './horizontal-panes.md'
import MarkdownPreview from '@uiw/react-markdown-preview'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

 const HorizantalPanes = () => {
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Horizontal Panes</h3>
      </div>
      <div className='m-20-0'>
        <p>By default, the <code>ResizablePanes</code> component aligns the panes horizontally.</p>
      </div>
      <div className='h-300' >
        <ResizablePanes
          resizer={
            <CustomResizerFirst horizontal />
            }
          uniqueId="horizontally-doc"
          unit='ratio'
        >

          <Panes
            className={pane2} id={pane2} minSize={10} size={50}
          >
          </Panes>

          <Panes
            className={pane3} id={pane3} minSize={10} size={50}
          >
          </Panes>

        </ResizablePanes>
      </div>
      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={HORIZONTAL_PANES_MD} />
      </div>

    </div>

  )
}

export default HorizantalPanes