import React, { useState } from 'react'
import MinMaxViewer from '../../components/min-max-viewer'
import MinMaxPanes from './min-max-panes'

const PanesMinMax = () => {


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
        <MinMaxPanes />
      </div>

    </div>
  )
}

export default PanesMinMax