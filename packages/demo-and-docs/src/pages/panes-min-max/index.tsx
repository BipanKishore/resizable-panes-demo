import React, {useCallback, useState} from 'react'
import MinMaxViewer from '../../components/min-max-viewer'
import MIN_MAX_PANES_MD from './min-max-panes.md'
import MarkdownPreview from '@uiw/react-markdown-preview'

import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

export const PanesMinMax = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  const [pansizes, setPansizes] = useState<any>({
    pane1: 280,
    pane2: 335,
    pane3: 280
  })

  const onResize = useCallback((e: any) => {
    setPansizes(e)
  }, [])

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

      <ResizablePanes
        className='h-300' resizer={ <CustomResizerFirst />}
        vertical
        onResize={onResize}
      >

        <Panes
          className={pane1} id={pane1}
          maxSize={450}
          minSize={100}
          size={280}
        >
          <MinMaxViewer
            maxSize={450}
            minSize={100}
            size={pansizes.pane1}
          />

        </Panes>

        <Panes
          className={pane2} id={pane2}
          maxSize={400}
          minSize={100}
          size={335}
        >
          <MinMaxViewer
            maxSize={400}
            minSize={100}
            size={pansizes.pane2}
          />
        </Panes>

        <Panes
          className={pane3} id={pane3}
          maxSize={500}
          minSize={150}
          size={280}
        >
          <MinMaxViewer
            maxSize={500}
            minSize={150}
            size={pansizes.pane3}
          />
        </Panes>

      </ResizablePanes>
      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={MIN_MAX_PANES_MD} />
      </div>
    </div>
  )
}
