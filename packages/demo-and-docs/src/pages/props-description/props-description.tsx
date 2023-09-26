import React from 'react'

// import Img from '../../../assets/images/dummy-doc.png'

export const PropsDescription = () => {
  return (
    <div>

      <h2>Main Heading</h2>
      <h2>ResizablePanes Props</h2>

      <div className='m-20-0'>
        split?: SplitType
        An optional prop that specifies the type of
        splitter used between the panes. The SplitType enum is used to define the splitter type,
        and it can have values like 'vertical' or 'horizontal'.
      </div>
      <hr />
      <div className='m-20-0'>
        onResizeStart?: onResizeType
        An optional callback function that is called when a resize operation is initiated.
        It receives an IResizableApi object as its argument.
      </div>
      <hr />

      <div className='m-20-0'>
        onResizeStop?: onResizeType
        An optional callback function that is called when a resize operation is completed.
        It receives an IResizableApi object as its argument.
      </div>

      {/* <img src={Img} /> */}
    </div>
  )
}
