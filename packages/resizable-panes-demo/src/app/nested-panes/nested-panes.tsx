"use client"
import { EVEN_PANE_CLASS, ODD_PANE_CLASS } from '@/shared/constant'
import React from 'react'
import {
  Pane, ResizablePanes
} from 'resizable-panes-react'

const NestedPanes = () => {


  return (
        <ResizablePanes
          uniqueId='Nesting-Main-container'
          unit="ratio"
          vertical
        >
          <Pane className={ODD_PANE_CLASS} id='P0' minSize={10} size={25}>
            <div className='h-300' >
              <ResizablePanes
                uniqueId='Nesting-child-2'
                unit="ratio"
              >
              <Pane className={ODD_PANE_CLASS} id='P0-P0' minSize={1} size={2}></Pane>
              <Pane className={EVEN_PANE_CLASS} id='P0-P1' minSize={1} size={4}> </Pane>
              </ResizablePanes>
            </div>
          </Pane>

          <Pane className={EVEN_PANE_CLASS} id='P1' minSize={10} size={50}>
          </Pane>

          <Pane className={ODD_PANE_CLASS} id='P2' minSize={10} size={25}>
            <div className='h-300'>
              <ResizablePanes
                uniqueId='Nesting-child-1'
                unit="ratio"
              >
              <Pane className={ODD_PANE_CLASS} id='P2-P0' minSize={1} size={2}></Pane>
              <Pane className={EVEN_PANE_CLASS} id='P2-P1' minSize={1} size={4}> </Pane>
              </ResizablePanes>
            </div>
          </Pane>
        </ResizablePanes>
  )
}

export default NestedPanes