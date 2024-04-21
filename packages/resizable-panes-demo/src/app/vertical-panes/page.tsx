import React from 'react'
import VerticalPanes from './vertical-panes'


 const VerticalPanesPage = () => {
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Vertical Panes</h3>
      </div>

      <div className='m-20-0'>
        <p>
          By default, the <code>ResizablePanes</code> component aligns the panes vertically.
        </p>
      </div>
      <div className='m-20-0 h-300' >
        <VerticalPanes />
      </div>
    </div>
  )
}


export default  VerticalPanesPage