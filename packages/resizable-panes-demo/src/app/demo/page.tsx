
import React from 'react'
import PanesDemo from './panes-demo'

interface IIDMap{
    [id: string]: boolean
}

const DemoPanes = () => {

  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Demo</h3>
      </div>

      <div className='m-20-0'>
        <p>
          This library is highly customizable and can be used in various applications
          where flexible layout management is required.
        </p>
      </div>

      <div className="m-20-0">
        <strong>Note: </strong> Only main ResizablePanes is storing data in Session Storage.
      </div>

    <PanesDemo />

    </div>
  )
}
export default DemoPanes