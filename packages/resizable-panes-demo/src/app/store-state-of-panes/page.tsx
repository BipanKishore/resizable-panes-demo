
import React from 'react'
import StoreStateOfPanes from './store-state-of-panes'

const Page = () => {
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Store Panes Size</h3>
      </div>

      <div className='m-20-0'>
        <p>The <code>ResizablePanes</code> component can persist sizes and visibilities of Panes
          using the <code>uniqueId</code> prop as key in Local or Session Storage.
          Use the prop <code>storageApi</code> to provide
          the <code>localStorage</code> or <code>sessionStorage</code> to save data
          or you can provide your own custom storage api.
        </p>
      </div>
      <div className='m-20-0' >

        <div className='h-300' >
          <StoreStateOfPanes />
        </div>
      </div>
    </div>
  )
}

export default Page