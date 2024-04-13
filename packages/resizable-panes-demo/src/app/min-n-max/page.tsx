"use client"

import React, {useState} from 'react'
import MinMaxViewer from '../../components/min-max-viewer'
import MIN_MAX_PANES_MD from './min-max-panes.md'
import MarkdownPreview from '@uiw/react-markdown-preview'

import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

 const PanesMinMax = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  const [pansizes, setPansizes] = useState<any>({})
  const [paneMinSizes, setPaneMinSizes] = useState<any>({})
  const [paneMaxSizes, setPaneMaxSizes] = useState<any>({})

  const onReady = (api: any) => {
    const minSizes = api.getMap('minSize')
    const maxSizes = api.getMap('maxSize')
    setPaneMinSizes(minSizes)
    setPaneMaxSizes(maxSizes)
    console.log(minSizes, maxSizes)
  }

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Min and Max sizes</h3>
      </div>

      <div className='m-20-0'>
        <p>You can control a pane's minimum and maximum size by using
          the <code>minSize</code> and <code>maxSize</code> props.
        </p>
      </div>

      <div className='h-300' >
        <ResizablePanes
          resizer={ <CustomResizerFirst />}
          uniqueId='Min-Max-2'
          unit="ratio"
          vertical
          onReady={onReady}
          onResize={setPansizes}
          onResizeStop={setPansizes}
        >

          <Panes
            className={pane1} id={pane1}
            maxSize={450}
            minSize={100}
            size={280}
          >
            <MinMaxViewer
              id={pane1}
              maxSizes={paneMaxSizes}
              minSizes={paneMinSizes}
              sizes={pansizes}
            />

          </Panes>

          <Panes
            className={pane2} id={pane2}
            maxSize={400}
            minSize={100}
            size={335}
          >
            <MinMaxViewer
              id={pane2}
              maxSizes={paneMaxSizes}
              minSizes={paneMinSizes}
              sizes={pansizes}
            />
          </Panes>

          <Panes
            className={pane3} id={pane3}
            maxSize={500}
            minSize={150}
            size={280}
          >
            <MinMaxViewer
              id={pane3}
              maxSizes={paneMaxSizes}
              minSizes={paneMinSizes}
              sizes={pansizes}
            />
          </Panes>

        </ResizablePanes>
      </div>
      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={MIN_MAX_PANES_MD} />
      </div>
    </div>
  )
}

export default PanesMinMax