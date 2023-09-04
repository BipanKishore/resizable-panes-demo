import PropTypes from 'prop-types'
import React from 'react'

import {
  Panes, ResizablePanes
} from 'react-resizable-panes'
import {TestComp} from './test-comp'
import {CLASS_NAME} from './constant'

export const DefaultSizes = ({
  onReady, set
}) => {
  return (
    <ResizablePanes
      resizerSize={5}
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
          <TestComp name={id} />
        </Panes>
      ))

    }

    </ResizablePanes>
  )
}

DefaultSizes.propTypes = {
  set: PropTypes.object,
  onReady: PropTypes.func
}
