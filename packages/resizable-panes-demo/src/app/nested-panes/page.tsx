
import React from 'react'
import NestedPanes from './nested-panes'

const Page = () => {

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Nested Panes</h3>
      </div>
      <div className='m-20-0'>
        <p>For nested panes, simply nest another <code>ResizablePanes</code> component
          inside a <code>Pane</code> component.
        </p>
      </div>

      <div className='h-300' >
        <NestedPanes />
      </div>
    </div>
  )
}

export default Page