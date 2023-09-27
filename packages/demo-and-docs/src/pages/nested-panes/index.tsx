import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import NESTED_PANES_MD from './nested-panes.md'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

export const NestedPanes = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Nested Panes</h3>
      </div>
      <div className='m-20-0'>
        To use nested panes just place another ResizablePanes component inside a Pane component.
      </div>
      <ResizablePanes
        resizer={
          <CustomResizerFirst />
            } split='vertical'
      >
        <Panes
          className={pane1} id={pane1} minSize={100}

          size={200}
        >
          <ResizablePanes
            resizer={
              <CustomResizerFirst horizontal />
            } split='horizontal'
          >
            <Panes
              className={pane1} id={pane1} size={150}
            >
            </Panes>
            <Panes className={pane3} id={pane3} size={150}> </Panes>
          </ResizablePanes>
        </Panes>

        <Panes
          className={pane2} id={pane2} minSize={100} size={400}
        >
        </Panes>

        <Panes className={pane3} id={pane3} minSize={100} size={200}>
          <ResizablePanes
            resizer={
              <CustomResizerFirst horizontal />
            } split='horizontal'
          >
            <Panes
              className={pane1} id={pane1} size={150}
            >
            </Panes>
            <Panes className={pane3} id={pane3} size={150}> </Panes>
          </ResizablePanes>
        </Panes>
      </ResizablePanes>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={NESTED_PANES_MD} />
      </div>

    </div>
  )
}
