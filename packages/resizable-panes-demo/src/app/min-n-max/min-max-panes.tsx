"use client"

import React, {useState} from 'react'
import MinMaxViewer from '../../components/min-max-viewer'

import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import { EVEN_PANE_CLASS, ODD_PANE_CLASS } from '@/shared/constant'


const MinMaxPanes = () => {
  
    const [pansizes, setPansizes] = useState<any>({})
    const [paneMinSizes, setPaneMinSizes] = useState<any>({})
    const [paneMaxSizes, setPaneMaxSizes] = useState<any>({})
  
    const onReady = (api: any) => {
      const minSizes = api.getMap('minSize')
      const maxSizes = api.getMap('maxSize')
      setPaneMinSizes(minSizes)
      setPaneMaxSizes(maxSizes)
    }
  
    return (

          <ResizablePanes
            uniqueId='Min-Max-2'
            unit="ratio"
            vertical
            onReady={onReady}
            onResize={setPansizes}
            onResizeStop={setPansizes}
          >
  
            <Panes
              className={ODD_PANE_CLASS} id='P0'
              maxSize={450}
              minSize={100}
              size={280}
            >
              <MinMaxViewer
                id='P0'
                maxSizes={paneMaxSizes}
                minSizes={paneMinSizes}
                sizes={pansizes}
              />
  
            </Panes>
  
            <Panes
              className={EVEN_PANE_CLASS} id='P1'
              maxSize={400}
              minSize={100}
              size={335}
            >
              <MinMaxViewer
                id='P1'
                maxSizes={paneMaxSizes}
                minSizes={paneMinSizes}
                sizes={pansizes}
              />
            </Panes>
  
            <Panes
            className={ODD_PANE_CLASS} id='P2'
              maxSize={500}
              minSize={150}
              size={280}
            >
              <MinMaxViewer
                id='P2'
                maxSizes={paneMaxSizes}
                minSizes={paneMinSizes}
                sizes={pansizes}
              />
            </Panes>
  
          </ResizablePanes>
    )
  }
  
  export default MinMaxPanes