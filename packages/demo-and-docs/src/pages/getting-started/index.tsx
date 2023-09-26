import React from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import GETTING_STARTED_MD from './getting-started.md'

import VERTICAL_PANE_MD from '../vertical-pane/vertical-pane.md'

export const GettingStarted = () => {
  return (
    <div>
      <h3>Overview</h3>
      The ResizablePanes component is a React component designed to create resizable panes that allow users to
      adjust the size of individual sections within a container. This component is highly customizable and can
      be used in various applications where flexible layout management is required.


      <div className="mark-down-container m-20-0">
        <h3>Installation</h3>
        <MarkdownPreview className="" source={GETTING_STARTED_MD} />
      </div>

      <h3>Usage</h3>
      To use the ResizablePanes component, import it into your React application and include it in your JSX code.
      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={VERTICAL_PANE_MD} />
      </div>
    </div>
  )
}
