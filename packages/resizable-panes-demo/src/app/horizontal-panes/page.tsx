
import React from 'react'
import HorizontalPanes from './horizontal-panes'

const HorizantalPanes = () => {

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Horizontal Panes</h3>
      </div>
      <div className='m-20-0'>
        To align the panes horizontally, simply pass the <code>vertical</code>(boolean) prop as <code>false</code> to
          the <code>ResizablePanes</code> component.
      </div>
      <div className='h-300' >
        <HorizontalPanes />
      </div>


    </div>

  )
}

export default HorizantalPanes