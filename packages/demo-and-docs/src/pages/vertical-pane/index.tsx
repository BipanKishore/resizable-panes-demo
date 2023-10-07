import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import VERTICAL_PANE_MD from './vertical-pane.md'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'
import {PlainDummy} from '../../components'
export const VerticalPanes = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Vertical Panes</h3>
      </div>

      <div className='m-20-0'>
        <p>To align the panes vertically, simply pass the <code>vertical</code>(boolean) prop to
          the <code>ResizablePanes</code> component.
        </p>
      </div>
      <div className='m-20-0 h-300' >
        <ResizablePanes
          className='' resizer={
            <CustomResizerFirst />
            }
          unit='ratio'
          vertical
        >
          <Panes className={pane1} id={pane1} minSize={3} size={30}>
            <PlainDummy name="pane1" />
          </Panes>

          <Panes
            className={pane2} id={pane2} minSize={4} size={40}
          >
          </Panes>

          <Panes className={pane3} id={pane3} minSize={3} size={30}>
          </Panes>
        </ResizablePanes>
      </div>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={VERTICAL_PANE_MD} />
      </div>
    </div>
  )
}
