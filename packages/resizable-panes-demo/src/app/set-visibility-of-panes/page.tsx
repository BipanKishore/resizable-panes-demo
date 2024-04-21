
import React from 'react'
import VisibilityOperationsExample from './visibility-operations-example'

const SetVisibilityOfPanes = () => {
  return (
    <div>
      <div>
        <h3 className='t-color-mainBlue t-aligin-center'>Show and hide panes</h3>
      </div>
      <div className='m-20-0'>
        You can toggle the visibility of a pane using the visibility prop of <code>ResizablePanes</code>.
        It is a object that uses the id of <code>Pane</code> component to set the visibility of Panes.
        This action hides or shows the pane without removing the element from the view.
      </div>

      <div className='m-20-0'>
        <strong>Note: </strong> In case you are using your own custom resizer
        provide the <code>resizerSize</code> prop to <code>ResizablePanes</code> component
        or  <code>Pane</code> component. It is only required when you when you want to
        display or hide the <code>Pane</code> components.
      </div>

      <VisibilityOperationsExample />
    </div>
  )
}

export default SetVisibilityOfPanes