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
        <p>For nested panes, simply nest another <code>ResizablePanes</code> component
          inside a <code>Pane</code> component.
        </p>
      </div>

      <div className='h-300' >
        <ResizablePanes
          resizer={
            <CustomResizerFirst />
            }
          unit="ratio"
          vertical
        >
          <Panes className={pane1} id={pane1} minSize={10} size={25}>
            <div className='h-300' >
              <ResizablePanes
                resizer={
                  <CustomResizerFirst horizontal />
            }
                unit="ratio"
              >
                <Panes className={pane1} id={pane1} minSize={17} size={34}></Panes>
                <Panes className={pane3} id={pane3} minSize={17} size={66}> </Panes>
              </ResizablePanes>
            </div>
          </Panes>

          <Panes className={pane2} id={pane2} minSize={10} size={50}>
          </Panes>

          <Panes className={pane3} id={pane3} minSize={10} size={25}>

            <div className='h-300' >
              <ResizablePanes
                resizer={
                  <CustomResizerFirst horizontal />
            }
                unit="ratio"
              >
                <Panes className={pane1} id={pane1} minSize={17} size={34}></Panes>
                <Panes className={pane3} id={pane3} minSize={17} size={66}> </Panes>
              </ResizablePanes>
            </div>
          </Panes>
        </ResizablePanes>
      </div>
      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={NESTED_PANES_MD} />
      </div>

    </div>
  )
}
