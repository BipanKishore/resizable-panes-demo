import PropTypes from 'prop-types'
import React from 'react'

import {
  Panes, ResizablePanes
} from '../resizable-panes'
import {TestComp} from './test-comp'

export const DefaultSizes = ({
  onReady, set
}) => {
  const {
    maxSizes,
    minSizes,
    sizes
  } = set

  return (
    <ResizablePanes
      resizerSize={5}
      onReady={onReady}
    >

      {
        <Panes className='pane1' id='pane1' maxSize={maxSizes[0]} minSize={minSizes[0]} size={sizes[0]} >
          <TestComp name={'Pane 1'} />
        </Panes>
            }

      <Panes className='pane2' id='pane2' maxSize={maxSizes[1]} minSize={minSizes[1]} size={sizes[1]} >
        <TestComp name={'Pane 2'} />
      </Panes>

      <Panes className='pane3' id='pane3' maxSize={maxSizes[2]} minSize={minSizes[2]} size={sizes[2]} >
        Pane 111
      </Panes>

      <Panes className='pane2' id='pane4' maxSize={maxSizes[3]} minSize={minSizes[3]} size={sizes[3]} >
        Pane 1111
      </Panes>

    </ResizablePanes>
  )
}

DefaultSizes.propTypes = {
  set: PropTypes.object,
  onReady: PropTypes.func
}
