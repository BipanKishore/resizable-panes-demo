"use client"
import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'

const NestedPanes = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'

  return (

        <ResizablePanes
          uniqueId='Nesting-Main-container'
          unit="ratio"
          vertical
        >
          <Panes className={pane1} id={pane1} minSize={10} size={25}>
            <div className='h-300' >
              <ResizablePanes
                uniqueId='Nesting-child-2'
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
                uniqueId='Nesting-child-1'
                unit="ratio"
              >
                <Panes className={pane1} id={pane1} minSize={17} size={34}></Panes>
                <Panes className={pane3} id={pane3} minSize={17} size={66}> </Panes>
              </ResizablePanes>
            </div>
          </Panes>
        </ResizablePanes>

  )
}

export default NestedPanes