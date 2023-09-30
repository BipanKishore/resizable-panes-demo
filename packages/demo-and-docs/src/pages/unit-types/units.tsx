import React from 'react'
import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import {CustomResizerFirst} from '../../components/custom-resizers/custom-resizer-first'

export const UnitTypes = () => {
  const pane1 = 'pane1'
  const pane2 = 'pane2'
  const pane3 = 'pane3'
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Vertical Panes</h3>
      </div>

      <div className='m-20-0'>
        <p>To align the panes vertically, simply pass the <code>vertical</code>(boolean) prop to
          the <code>ResizablePanes</code> component.
        </p>
      </div>
      <div className='m-20-0' >
        <ResizablePanes
          className='h-300' resizer={
            <CustomResizerFirst />
            }
          unit='ratio'
          vertical
        >
          <Panes className={pane1} id={pane1} maxSize={50} minSize={10} size={30}>
          </Panes>

          <Panes className={pane2} id={pane2} maxSize={50} minSize={10} size={40}>
          </Panes>

          <Panes className={pane3} id={pane3} maxSize={50} minSize={10} size={30}>
          </Panes>
        </ResizablePanes>
      </div>

    </div>
  )
}
