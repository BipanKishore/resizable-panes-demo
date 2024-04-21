import React from 'react'

const GettingStarted = () => {
  return (
    <div>
      <h3>Overview</h3>
      The <code>ResizablePanes</code> component is a React component designed to create resizable panes
      that allow users to
      adjust the size of individual sections within a container. This component is highly customizable and can
      be used in various applications where flexible layout management is required.

      {/* <iframe width={'100%s'} src="https://stackblitz.com/edit/angular?embed=1"></iframe> */}

      <div className="mark-down-container m-20-0 ">
        <h3>Installation</h3>

        <div className='p-4 bg-code rounded text-sm' >
          <p className='m-0'>
          <span className='color-code-function' > npm i </span>resizable-panes-react  <span className='color-code-flag' >--save</span>
          </p>
          <p className='color-code-comment m-0' >
            # or
          </p>
          <p className='m-0'>
          <span className='color-code-function' >yarn add</span> 
            resizable-panes-react
          </p>
        </div>

      </div>

      <h3>Usage</h3>
      To use the <code>ResizablePanes</code> component, import
      it into your React application and include the following JSX
      in your  code.
      <div>
        <p>
          The <code>uniqueId</code> prop is required for the <code>ResizablePanes</code> component
          and <code>id</code> and <code>size</code> props
          are required for the <code>Pane</code> component.
        </p>
      </div>
      <div className="mark-down-container m-20-0">


      </div>

      <div className="m-20-0">
        <p><strong>Size Units for Panes:</strong></p>

        <p>
          The <code>ResizablePanes</code> component allows you to specify the
          sizes of panes using three different units:

        </p>
        <ol className='ml-8'>
          <li>
            <p><strong>Percentage (%):</strong> You can assign pane sizes in percentage values
              to distribute available space proportionally. Ensure that the sum of all percentage sizes
              equals 100% to use this unit effectively.
            </p>
          </li>
          <li>
            <p><strong>Ratio (No Unit):</strong> You can specify
              pane sizes as ratios, indicating their relative size in comparison to
              the available space.
            </p>
          </li>
          <li>
            <p><strong>Pixel (px):</strong> The default unit is pixels.
              You can define pane size in pixels.
            </p>
          </li>
        </ol>

        <p><strong>Note:</strong> In Ratio or Percentage unit mode, the <code>ResizablePanes</code> component
          will take the size of its parent element into account when determining the size of panes.
        </p>

      </div>

    </div>
  )
}


export default GettingStarted