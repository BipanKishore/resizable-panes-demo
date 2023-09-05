import PropTypes from 'prop-types'
import React, { useState } from 'react'

import {
  Panes, ResizablePanes
} from 'react-resizable-panes'
import {TestComp} from './test-comp'
import {CLASS_NAME} from './constant'
import { ResizerNode1 } from './src/components/resizer-nodes/resize-node-1'

export const DefaultSizes = ({
  onReady, set, split
}) => {


  return (
    <ResizablePanes
      resizerSize={25}
      onReady={onReady}
      split={split}
      storage={window.sessionStorage}
      resizerNode={ResizerNode1}
    >

      {set.ids.map((id, index) => (
        <Panes
          className={CLASS_NAME[index % 3]}
          id={id}
          key={id}
          maxSize={set.maxSizes[index]}
          minSize={set.minSizes[index]}
          size={set.sizes[index]}
        >
          <TestComp name={id} />
        </Panes>
      ))

    }

    </ResizablePanes>
  )
}

DefaultSizes.propTypes = {
  set: PropTypes.object,
  onReady: PropTypes.func,
  split: PropTypes.string
}
