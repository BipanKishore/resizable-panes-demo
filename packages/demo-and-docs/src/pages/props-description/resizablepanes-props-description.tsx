import React from 'react'

export const ResizablePanesPropsDescription = () => {
  return (
    <div>
      <h2>ResizablePanes Props</h2>

      <div className='m-20-0'>
        <p><strong>onReady (function):</strong> An optional callback function that is invoked
          when the <code>ResizablePanes</code> component is initialized and ready for use.
          It receives an <code>api</code> object as an argument, allowing you to interact
          with the <code>ResizablePanes</code> API.
        </p>
      </div>
      <hr />
      <div className='m-20-0'>
        <p><strong>vertical (boolean):</strong> An optional boolean prop that,
          when set to <code>true</code>, configures the <code>ResizablePanes</code> to align the panes
          vertically. By default, it's set to <code>false</code>, resulting in horizontal alignment.
        </p>
      </div>

      <hr />
      <div className='m-20-0'>
        <p><strong>resizer (React Element):</strong> An optional prop that allows you to
          provide a custom resizer component for the panes within the <code>ResizablePanes</code> component.
          Instead of using the default resizer, you can specify your own React element to handle
          resizing interactions. This allows for custom styling and behavior of the resizer.
        </p>

      </div>

      <hr />
      <div className='m-20-0'>
        <p><strong>onResizeStop (function):</strong> A callback function triggered when a resizing operation
          is completed. It receives a parameter of type <code>IMapIdToSize</code>, which maps
          the unique IDs of panes to their new sizes after resizing.
        </p>
      </div>

      <hr />
      <div className='m-20-0'>
        <p><strong>onResize (function):</strong> A callback function invoked during a resizing operation,
          providing real-time feedback on the resizing process.
          It also receives a parameter of type <code>IMapIdToSize</code>, allowing you to track
          the current sizes of panes as they are being resized.
        </p>
      </div>

      <hr />
      <div className='m-20-0'>
        <p><strong>className (string):</strong> The CSS class
          name to apply to the <code>ResizablePanes</code> component.
        </p>
      </div>

      <hr />
      <div className='m-20-0'>
        <p><strong>onChangeVisibility (function):</strong> A callback function that is called when the
          visibility of panes changes. It receives a parameter of type <code>IKeyToBoolMap</code>,
          which maps pane IDs to boolean values indicating their visibility status.
        </p>
      </div>

    </div>
  )
}
