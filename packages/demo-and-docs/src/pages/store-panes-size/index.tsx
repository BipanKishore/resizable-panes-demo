import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

export const StorePanesSize = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Store Panes Size</h3>
      </div>

      <div className='m-20-0'>
        <p>The <code>ResizablePanes</code> component can persist sizes using the <code>storeKey</code> prop.
          You can use an extra prop, <code>sessionStore</code>, to
          instruct the <code>ResizablePanes</code> component to store data in <code>sessionStorage</code>.
        </p>
      </div>
      <div className='m-20-0' >

        <div className='h-300' >
          <ResizablePanes
            resizer={
              <CustomResizerFirst />
            }
            sessionStore
            storeKey="panes-size"
            unit="ratio"
            vertical
          >
            <Panes className={pane1} id={pane1} minSize={1} size={3}>
            </Panes>

            <Panes className={pane2} id={pane2} minSize={1} size={4}>
            </Panes>

            <Panes className={pane3} id={pane3} minSize={1} size={3}>
            </Panes>
          </ResizablePanes>
        </div>
      </div>
    </div>
  )
}
