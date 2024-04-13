import React from 'react'

const PanesPropsDescription = () => {
  return (
    <div>

      <h2>Pane Props</h2>

      <div className='m-20-0'>
        <p><strong>id (string) [Required]:</strong> This prop is used to uniquely identify the pane.
          It should be a unique string identifier for each pane within the <code>ResizablePanes</code> component.
        </p>
      </div>
      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>size (number) [Required]:</strong> The <code>size</code> prop determines the initial
          size of the pane. It specifies the width (or height, if the panes are vertical) of the pane in pixels.
        </p>
      </div>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>minSize (number):</strong> The <code>minSize</code> prop sets the minimum allowed size
          for the pane. If the user tries to resize the pane to a size smaller than this value,
          it won't go below the specified minimum size.
        </p>
      </div>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>maxSize (number):</strong> The <code>maxSize</code> prop defines the maximum allowed size for
          the pane. If the user attempts to resize the pane to a size larger than this value,
          it won't exceed the specified maximum size.
        </p>
      </div>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>resizer (React Element):</strong> The <code>resizer</code> prop allows you to provide
          a custom resizer component for the pane. Instead of using the default resizer
          provided by the <code>ResizablePanes</code> component, you can specify your own
          React element to handle resizing interactions for this specific pane.
        </p>
      </div>
      <div className="m-20-0">
        <p>
          <strong>resizerSize (number in pixel):</strong>
          In case you are using your own custom resizer provide the <code>resizerSize</code> prop
          to <code>ResizablePanes</code> component or Pane component.
          <span className='f-weight-500'> It is only required when you when you want
            to display or hide the <code>Pane</code> components.
          </span>
        </p>
      </div>
      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>className (string):</strong> The CSS class
          name to apply to the <code>Pane</code> component's container element.
        </p>
      </div>
    </div>
  )
}

export default PanesPropsDescription