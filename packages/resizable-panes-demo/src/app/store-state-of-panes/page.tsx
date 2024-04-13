"use client"
import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

 const StorePanesSize = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Store Panes Size</h3>
      </div>

      <div className='m-20-0'>
        <p>The <code>ResizablePanes</code> component can persist sizes and visibilities of Panes
          using the <code>uniqueId</code> prop as key in Local or Session Storage.
          Use the prop <code>storageApi</code> to provide
          the <code>localStorage</code> or <code>sessionStorage</code> to save data
          or you can provide your own custom storage api.
        </p>
      </div>
      <div className='m-20-0' >

        <div className='h-300' >
          <ResizablePanes
            resizer={
              <CustomResizerFirst />
            }
            storageApi={localStorage}
            uniqueId="panes-size"
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

export default StorePanesSize