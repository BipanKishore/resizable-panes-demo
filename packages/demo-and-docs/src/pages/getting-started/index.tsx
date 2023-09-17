import React from 'react'
import MarkdownPreview from '@uiw/react-markdown-preview'
import GETTING_STARTED_MD from './getting-started.md'

import VERTICAL_PANE_MD from '../vertical-pane/vertical-pane.md'

export const GettingStarted = () => {
  return (
    <div>
      GettingStarted

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={GETTING_STARTED_MD} />
      </div>

      <div className="mark-down-container m-20-0">
        <MarkdownPreview className="" source={VERTICAL_PANE_MD} />
      </div>
    </div>
  )
}
