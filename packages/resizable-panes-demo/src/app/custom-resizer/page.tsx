import React from 'react'
import {
  Pane, ResizablePanes
} from 'resizable-panes-react'
import PanesWithCustomResizer from './panes-with-custom-resizer'

const CustomResizer = () => {
  return (
    <div>
      <div>
        <h3 className='t-aligin-center'>Custom Resizer for Panes</h3>
      </div>

      <div className='m-20-0'>
        <p>You can customize the resizer by using the <code>resizer</code> prop. When applied
          to the <code>ResizablePanes</code> component, it affects all panes. Alternatively, you can use
          the <code>Pane</code> component's <code>resizer</code> prop to customize the resizer for a specific pane.
        </p>

      </div>
      <div className='m-20-0 h-300' >
        <PanesWithCustomResizer />
      </div>


      <div>
        <h4 className=''>Implementation</h4>
      </div>
      <div className="m-20-0">
        <p>The <code>CustomResizer</code> component should include
          an <code>onMouseDown</code> (and <code>onTouchStartCapture </code>
          for touch devices)
          prop, which should
          be attached to the element that, upon being clicked and dragged, initiates the resizing of the pane's size.
        </p>
        <p>The <code>CustomResizer</code> component will have
          a <code>isMouseDown</code> boolean prop, which you can utilize to
          style the <code>CustomResizer</code> component based on whether a mouse button
          is being held down during resizing.
        </p>
      </div>

    </div>
  )
}

export default CustomResizer