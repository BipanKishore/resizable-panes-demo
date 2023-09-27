import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import SIMPLE_PANES_MD from './simple-panes.md'
export const SimplePanes = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Simple Panes</h3>
      </div>

      <div className='m-20-0'>
        <p>By default, the <code>ResizablePanes</code> component comes with a default resizer set at 2 pixels.
          However, if you wish to use your own custom resizer, you can do so by utilizing the <code>resizer</code> prop.
        </p>
      </div>
      <div className='m-20-0' >
        <ResizablePanes>
          <Panes
            className={pane1} id={pane1} size={100}
          >
          </Panes>

          <Panes
            className={pane2} id={pane2} size={150}
          >
          </Panes>

          <Panes className={pane3} id={pane3} size={120}>
          </Panes>
        </ResizablePanes>
      </div>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={SIMPLE_PANES_MD} />
      </div>
    </div>
  )
}
