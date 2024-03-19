import React from 'react'

export const ResizablePanesPropsDescription = () => {
  return (
    <div>
      <h2>ResizablePanes Props</h2>

      <div className='m-20-0'>
        <p><strong>uniqueId (string) [Required]:</strong> It is required to uniquely
          identify the <code>ResizablePanes</code>.
        </p>
      </div>
      <hr className='w-90p' />

      <div className='m-20-0'>
        <p>
          <strong>vertical (boolean):</strong> An optional boolean prop that,
          when set to <code>true</code>, configures the <code>ResizablePanes</code> to align the panes
          vertically. By default, it's set to <code>false</code>, resulting in horizontal alignment.
        </p>
      </div>
      <hr className='w-90p' />

      <div className="m-20-0">
        <p className='m-b-0'>
          <strong>unit (string):</strong> An optional prop that determines the unit
          of measurement for the <code>size</code> prop of panes within the <code>ResizablePanes</code> component.
          It accepts two values:
        </p>

        <ul>
          <li><code>"pixel"</code> (default): Sizes are
            specified in pixels.
          </li>
          <li><code>"ratio"</code>: Sizes are specified as
            ratios relative to the available space.
          </li>
        </ul>
        <p>
          <strong>Using Percent Values with Ratios:</strong> If you want to specify
          pane sizes in percent values, ensure that the sum of all the ratios of
          panes equals 100.
        </p>
      </div>
      <hr className='w-90p' />

      <div className='m-20-0'>
        <p><strong>resizer (React Element):</strong> An optional prop that allows you to
          provide a custom resizer component for the panes within the <code>ResizablePanes</code> component.
          Instead of using the default resizer, you can specify your own React element to handle
          resizing interactions. This allows for custom styling and behavior of the resizer.
        </p>

      </div>
      <hr className='w-90p' />

      <div className="m-20-0">
        <p>
          <strong>visibility (object):</strong>
          This optional prop lets you control the display of individual panes within
          the <code>ResizablePanes</code> component by using their IDs. It takes an object where you specify
          which panes should be visible (<code>true</code>) or hidden (<code>false</code>).
        </p>
      </div>
      <div className="m-20-0">

        <p>
          <strong>resizerSize (number in pixel):</strong>
          In case you are using your own custom resizer provide the <code>resizerSize</code> prop
          to <code>ResizablePanes</code> component or Pane component.
          It is only required when you when you want to display or hide the <code>Pane</code> components.
        </p>
      </div>
      <hr className='w-90p' />

      <div className='m-20-0'>
        <p><strong>storageApi (Object):</strong> It is an optional prop. Use the prop to provide
          the <code>localStorage</code> or <code>sessionStorage</code> or you can provide
          your own custom storage api  to save data. <code>uniqueId</code> prop will be used as key to store data.
        </p>
      </div>
      <hr className='w-90p' />

      <div className='m-20-0'>
        <p>
          <strong>onResizeStop (function):</strong> A callback function triggered when a resizing operation
          is completed. It receives a parameter of type <code>IMapIdToSize</code>, which maps
          the unique IDs of panes to their new sizes after resizing.
        </p>
        <p><strong>onResize (function):</strong> A callback function invoked during a resizing operation,
          providing real-time feedback on the resizing process.
          It also receives a parameter of type <code>IMapIdToSize</code>, allowing you to track
          the current sizes of panes as they are being resized.
        </p>
      </div>
      <hr className='w-90p' />

      <div className='m-20-0'>
        <p><strong>onReady (function):</strong> An optional callback function that is invoked
          when the <code>ResizablePanes</code> component is initialized and ready for use.
          It receives an <code>api</code> object as an argument, allowing you to interact
          with the <code>ResizablePanes</code> API.
        </p>
      </div>
      <hr className='w-90p' />

      <div className='m-20-0'>
        <p>
          <strong>onChangeVisibility (function):</strong> A callback function that is called when the
          visibility of panes changes. It receives a parameter of type <code>IKeyToBoolMap</code>,
          which maps pane IDs to boolean values indicating their visibility status.
        </p>
      </div>
      <hr className='w-90p' />

      <div className='m-20-0'>
        <p><strong>className (string):</strong> The CSS class
          name to apply to the <code>ResizablePanes</code> component's container element.
        </p>
      </div>

    </div>
  )
}
