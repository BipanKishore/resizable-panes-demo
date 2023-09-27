import React, {useCallback, useRef, useState} from 'react'
import MinMaxViewer from '../../components/min-max-viewer'

import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'
import PaneModesIcons from '../../components/pane-modes-icons'

export const LiveDemo = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  const [parentPaneSizes, setParentPaneSizes] = useState<any>({
    header: 200,
    middle: 350,
    footer: 250
  })

  const [pansizes, setPansizes] = useState<any>({
    pane1: 350,
    pane2: 300,
    pane3: 200
  })

  const onResize = useCallback((e: any) => {
    setPansizes(e)
  }, [])

  const parentResizableRef = useRef<any>({})
  const middleResizableRef = useRef<any>({})

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Demo</h3>
      </div>

      <div className='m-20-0'>
        To set min and max size of a pane use minSize and MaxSize Prop.
      </div>

      <ResizablePanes
        resizer={ <CustomResizerFirst horizontal />}
        split='horizontal'
        onReady={(api: any) => {
          parentResizableRef.current.api = api
        }}
        onResize={setParentPaneSizes}
      >
        <Panes
          className={pane1} id='header'
          maxSize={450}
          minSize={100}
          size={200}
        >
          <PaneModesIcons id='header' resizableRef={parentResizableRef} />
          <MinMaxViewer
            maxSize={450}
            minSize={100}
            size={parentPaneSizes.header}
          />

        </Panes>
        <Panes
          className={pane1} id='middle'
          maxSize={450}
          minSize={100}
          size={350}
        >
          <ResizablePanes
            className='h-100p' resizer={ <CustomResizerFirst />}
            split='vertical'
            onReady={(api: any) => {
              middleResizableRef.current.api = api
            }}
            onResize={onResize}
          >

            <Panes
              className={pane1} id={pane1}
              maxSize={450}
              minSize={100}
              size={350}
            >

              <PaneModesIcons id={pane1} resizableRef={middleResizableRef} />
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
              size={300}
            >
              <PaneModesIcons id={pane2} resizableRef={middleResizableRef} />
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
              size={200}
            >
              <PaneModesIcons id={pane3} resizableRef={middleResizableRef} />
              <MinMaxViewer
                maxSize={500}
                minSize={150}
                size={pansizes.pane3}
              />
            </Panes>

          </ResizablePanes>
        </Panes>
        <Panes
          className={pane1} id='footer'
          maxSize={450}
          minSize={100}
          size={150}
        >

          <PaneModesIcons id='footer' resizableRef={parentResizableRef} />
          <MinMaxViewer
            maxSize={450}
            minSize={100}
            size={parentPaneSizes.footer}
          />

        </Panes>
      </ResizablePanes>
    </div>
  )
}
