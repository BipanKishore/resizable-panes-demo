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
      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>vertical (boolean):</strong> An optional boolean prop that,
          when set to <code>true</code>, configures the <code>ResizablePanes</code> to align the panes
          vertically. By default, it's set to <code>false</code>, resulting in horizontal alignment.
        </p>
      </div>

      <hr className='w-90p' />

      <div className="m-20-0">
        <p><strong>unit (string):</strong> An optional prop that determines the unit
          of measurement for the <code>size</code> prop of panes within the <code>ResizablePanes</code> component.
          It accepts two values:
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
      <div className='m-20-0'>
        <p><strong>onResizeStop (function):</strong> A callback function triggered when a resizing operation
          is completed. It receives a parameter of type <code>IMapIdToSize</code>, which maps
          the unique IDs of panes to their new sizes after resizing.
        </p>
      </div>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>onResize (function):</strong> A callback function invoked during a resizing operation,
          providing real-time feedback on the resizing process.
          It also receives a parameter of type <code>IMapIdToSize</code>, allowing you to track
          the current sizes of panes as they are being resized.
        </p>
      </div>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>className (string):</strong> The CSS class
          name to apply to the <code>ResizablePanes</code> component.
        </p>
      </div>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>onChangeVisibility (function):</strong> A callback function that is called when the
          visibility of panes changes. It receives a parameter of type <code>IKeyToBoolMap</code>,
          which maps pane IDs to boolean values indicating their visibility status.
        </p>
      </div>

      <p><strong>sessionStore (boolean):</strong> An optional
        boolean flag that, when set to <code>true</code>, instructs
        the <code>ResizablePanes</code> component to use <code>sessionStorage</code> for storage
        instead of the default <code>localStorage</code>. This allows you
        to store the component's memory data in the session storage, which persists
        only for the duration of a browser session.

      </p>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>storeKey (string):</strong> An optional prop used as a unique key to store
          memory data for the <code>ResizablePanes</code> component. By default, it utilizes <code>localStorage</code>.
        </p>
      </div>

      <hr className='w-90p' />
      <div className='m-20-0'>
        <p><strong>sessionStore (boolean):</strong> An optional boolean flag.
          When set to <code>true</code>, it makes the <code>ResizablePanes</code> component
          use <code>sessionStorage</code> for storage.
        </p>
      </div>

    </div>
  )
}
