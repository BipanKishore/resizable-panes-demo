import React from 'react'
import GETTING_STARTED_MD from './getting-started.md'
console.log('GETTING_STARTED_MD', GETTING_STARTED_MD)
import VERTICAL_PANE_MD from '../vertical-panes/vertical-panes.md'
import { MdPreview } from '@/components/md-preview'

 const GettingStarted = () => {
  return (
    <div>
      <h3>Overview</h3>
      The <code>ResizablePanes</code> component is a React component designed to create resizable panes
      that allow users to
      adjust the size of individual sections within a container. This component is highly customizable and can
      be used in various applications where flexible layout management is required.

      <div className="mark-down-container m-20-0">
        <h3>Installation</h3>
        <MdPreview className="" source={GETTING_STARTED_MD} />
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
        <MdPreview className="" source={VERTICAL_PANE_MD} />
      </div>

      <div className="m-20-0">
        <p><strong>Size Units for Panes:</strong></p>

        <p>
          The <code>ResizablePanes</code> component allows you to specify the
          sizes of panes using three different units:

        </p>
        <ol>
          <li>
            <p><strong>Percentage (%):</strong> You can assign pane sizes in percentage values
              to distribute available space proportionally. Ensure that the sum of all percentage sizes
              equals 100% to use this unit effectively.
            </p>
          </li>
          <li>
            <p><strong>Ratio (No Unit):</strong> You can specify
              pane sizes as ratios, indicating their relative sizes in comparison to
              the available space.
            </p>
          </li>
          <li>
            <p><strong>Pixel (px):</strong> The default unit is pixels.
              You can define pane sizes in pixels.
            </p>
          </li>
        </ol>

        <p><strong>Note:</strong> In Ratio or Percentage unit mode, the <code>ResizablePanes</code> component
          will take the size of its parent element into account when determining the sizes of panes.
        </p>

      </div>

    </div>
  )
}


export default GettingStarted