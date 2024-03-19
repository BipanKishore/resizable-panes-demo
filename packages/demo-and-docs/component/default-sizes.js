import PropTypes from 'prop-types'
import React from 'react'

import {
  Panes, ResizablePanes
} from 'resizable-panes-react'
import {TestComp} from './test-comp'
import {CLASS_NAME} from './constant'
import {ResizerNode1} from '../src/components/resizer-nodes/resize-node-1'

export const DefaultSizes = ({
  onReady, set, split, justUpdate
}) => {
  return (
    <ResizablePanes
      className='h-200'
      resizerSize={25}
      uniqueId='defaultPanes1'
      onResizeStop ={(map) => {
        // console.log('v-- onResizeStop', map)
      }}

      // Note required
      onResize={(map) => {
        // console.log('v-- onResize', map)
      }}
      // Note required
      vertical
      split={split} // Values 'horizontal' | 'vertical'
      // Note required
      // Note required
      onReady={onReady}
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
          <TestComp justUpdate={justUpdate} name={id} />
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
