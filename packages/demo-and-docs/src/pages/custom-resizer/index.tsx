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
        <p>You can customize the resizer by using the <code>resizer</code> prop. When applied
          to the <code>ResizablePanes</code> component, it affects all panes. Alternatively, you can use
          the <code>Pane</code> component's <code>resizer</code> prop to customize the resizer for a specific pane.
        </p>
        <p>"The <code>CustomResizer</code> component should include an <code>onMouseDown</code> prop, which should
          be attached to the element that, upon being clicked and dragged, initiates the resizing of the pane's size."
        </p>
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
            minSize={50} size={350}
          >
          </Panes>

          <Panes
            className={pane2} id={pane2} minSize={50}
            resizer={
              <CustomResizerSecond />
            }
            size={300}
          >
          </Panes>

          <Panes className={pane3} id={pane3} minSize={50} size={150}>
          </Panes>

        </ResizablePanes>
      </div>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={CUSTOM_RESIZER_MD} />
      </div>
    </div>
  )
}
