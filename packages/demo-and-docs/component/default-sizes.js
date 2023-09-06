import PropTypes from 'prop-types'
import React from 'react'

import {
  Panes, ResizablePanes
} from 'react-resizable-panes'
import {TestComp} from './test-comp'
import {CLASS_NAME} from './constant'
import {ResizerNode1} from './src/components/resizer-nodes/resize-node-1'

export const DefaultSizes = ({
  onReady, set, split
}) => {
  return (
    <ResizablePanes
      resizerNode={ResizerNode1}
      resizerSize={25}
      split={split}
      storage={window.sessionStorage}
      onReady={onReady}
      onResize={(map) => {
        // console.log('v-- onResize', map)
      }}
      onResizeStop ={(map) => {
        // console.log('v-- onResizeStop', map)
      }}
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
  split: PropTypes.string,
  onReady: PropTypes.func
}
